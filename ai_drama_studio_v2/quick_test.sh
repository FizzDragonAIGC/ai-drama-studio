#!/bin/bash
API="http://localhost:3001"
CONTENT="現代都市愛情：咖啡師小明與作家小紅的故事"

echo "🔍 快速測試5個核心智能體"
echo "=========================="

for agent in interview concept narrative character artdirector; do
  echo -n "$agent: "
  START=$(date +%s)
  
  RESP=$(curl -s --max-time 60 -X POST "$API/api/agent/$agent" \
    -H "Content-Type: application/json" \
    -d "{\"content\": \"$CONTENT\", \"title\": \"測試\"}")
  
  END=$(date +%s)
  TIME=$((END - START))
  
  if echo "$RESP" | grep -q '"result"'; then
    SKILLS=$(echo "$RESP" | jq -r '.skillsUsed | length')
    echo "✅ ${TIME}s | ${SKILLS} skills"
  else
    echo "❌ 失敗"
  fi
done
