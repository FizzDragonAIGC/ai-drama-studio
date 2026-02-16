#!/bin/bash
# 全面系統測試腳本
# 測試所有智能體的響應時間和Skill調用

API_URL="http://localhost:3001"
TEST_CONTENT="測試故事：一個現代都市愛情故事，主角是咖啡師小明和作家小紅"
TEST_TITLE="城市之戀"

AGENTS=(
  "director"
  "concept"
  "interview"
  "screenwriter"
  "adaptation"
  "narrative"
  "storyboard"
  "cinematography"
  "editing"
  "blocking"
  "artstyle"
  "artdirector"
  "character"
  "costume"
  "scene"
  "color"
  "expression"
  "acting"
  "pose"
  "psychology"
  "prompt"
  "platform"
  "vfx"
  "manga"
  "genre"
  "era"
  "culture"
  "music"
  "lighting"
  "weather"
  "shortform"
)

echo "=========================================="
echo "🔍 AI番劇系統全面測試"
echo "=========================================="
echo "測試時間: $(date)"
echo "API地址: $API_URL"
echo "智能體數量: ${#AGENTS[@]}"
echo ""

# 檢查API是否可用
echo "📡 檢查API連接..."
if curl -s --max-time 5 "$API_URL/api/agents" > /dev/null; then
  echo "✅ API連接正常"
else
  echo "❌ API連接失敗"
  exit 1
fi

echo ""
echo "=========================================="
echo "📊 開始測試所有智能體"
echo "=========================================="

RESULTS_FILE="/tmp/agent_test_results.json"
echo "[]" > "$RESULTS_FILE"

TOTAL_SUCCESS=0
TOTAL_FAIL=0
TOTAL_TIME=0

for agent in "${AGENTS[@]}"; do
  echo -n "測試 $agent... "
  
  START_TIME=$(date +%s.%N)
  
  RESPONSE=$(curl -s --max-time 90 -X POST "$API_URL/api/agent/$agent" \
    -H "Content-Type: application/json" \
    -d "{\"content\": \"$TEST_CONTENT\", \"title\": \"$TEST_TITLE\"}" 2>&1)
  
  END_TIME=$(date +%s.%N)
  ELAPSED=$(echo "$END_TIME - $START_TIME" | bc)
  TOTAL_TIME=$(echo "$TOTAL_TIME + $ELAPSED" | bc)
  
  # 解析結果
  if echo "$RESPONSE" | jq -e '.result' > /dev/null 2>&1; then
    SKILLS=$(echo "$RESPONSE" | jq -r '.skillsUsed | join(", ")' 2>/dev/null || echo "none")
    SKILLS_COUNT=$(echo "$RESPONSE" | jq '.skillsUsed | length' 2>/dev/null || echo "0")
    IN_TOKENS=$(echo "$RESPONSE" | jq '.tokens.input' 2>/dev/null || echo "0")
    OUT_TOKENS=$(echo "$RESPONSE" | jq '.tokens.output' 2>/dev/null || echo "0")
    
    echo "✅ ${ELAPSED}s | Skills: $SKILLS_COUNT | Tokens: $IN_TOKENS→$OUT_TOKENS"
    TOTAL_SUCCESS=$((TOTAL_SUCCESS + 1))
    STATUS="success"
  else
    ERROR=$(echo "$RESPONSE" | jq -r '.error' 2>/dev/null || echo "$RESPONSE")
    echo "❌ 失敗: $ERROR"
    TOTAL_FAIL=$((TOTAL_FAIL + 1))
    STATUS="failed"
    SKILLS="none"
    SKILLS_COUNT=0
  fi
  
  # 保存結果
  jq --arg agent "$agent" \
     --arg status "$STATUS" \
     --arg time "$ELAPSED" \
     --arg skills "$SKILLS" \
     --argjson skills_count "$SKILLS_COUNT" \
     '. += [{"agent": $agent, "status": $status, "time": $time, "skills": $skills, "skills_count": $skills_count}]' \
     "$RESULTS_FILE" > /tmp/temp.json && mv /tmp/temp.json "$RESULTS_FILE"
done

echo ""
echo "=========================================="
echo "📈 測試總結"
echo "=========================================="
echo "✅ 成功: $TOTAL_SUCCESS"
echo "❌ 失敗: $TOTAL_FAIL"
echo "⏱️ 總耗時: ${TOTAL_TIME}s"
AVG_TIME=$(echo "scale=2; $TOTAL_TIME / ${#AGENTS[@]}" | bc)
echo "📊 平均響應: ${AVG_TIME}s"
echo ""
echo "詳細結果已保存到: $RESULTS_FILE"

# 顯示Skills使用統計
echo ""
echo "=========================================="
echo "🔧 Skills使用統計"
echo "=========================================="
jq -r '.[] | select(.status=="success") | "\(.agent): \(.skills_count) skills"' "$RESULTS_FILE"
