#!/bin/bash
# ============================================================
# AI番劇工作台 完整端到端測試
# 模擬真實用戶操作流程
# ============================================================

set -e  # 任何錯誤立即停止

API="http://localhost:3001"
NOVEL="《測試故事》小明是個普通高中生。一天放學後，他在學校廢棄的儲藏室發現了一個閃著微光的古老盒子。當他好奇地打開盒子時，一道光芒射入他的眼睛，他獲得了能夠看見他人情緒的超能力。起初小明覺得這是個詛咒——他看到同學的嫉妒、老師的疲憊、父母的擔憂。但當一個神秘組織開始追蹤這個盒子時，小明意識到他必須學會控制這股力量來保護自己和家人。"

echo "============================================================"
echo "🔥 完整端到端測試 - 嚴格模式"
echo "============================================================"
echo ""

# ==================== 前置檢查 ====================
echo "【前置檢查】"

echo -n "  1. 服務器狀態... "
HEALTH=$(curl -s "$API/health" 2>/dev/null)
if echo "$HEALTH" | grep -q '"status":"ok"'; then
    echo "✅ OK"
else
    echo "❌ 失敗: $HEALTH"
    exit 1
fi

echo -n "  2. 設置極速模式... "
CONFIG=$(curl -s -X POST "$API/api/config" -H "Content-Type: application/json" -d '{"maxSkills":1,"contentLimit":2000}' 2>/dev/null)
if echo "$CONFIG" | grep -q '"status":"ok"'; then
    echo "✅ OK"
else
    echo "❌ 失敗: $CONFIG"
    exit 1
fi

echo ""
echo "【Step 1】高概念生成 (Concept Agent)"
echo -n "  調用API... "
START=$(date +%s)
CONCEPT=$(curl -s -X POST "$API/api/agent/concept" \
    -H "Content-Type: application/json" \
    -d "{\"content\": \"$NOVEL\"}" \
    --max-time 60 2>/dev/null)
END=$(date +%s)
DURATION=$((END-START))

if echo "$CONCEPT" | grep -q '"logline"'; then
    LOGLINE=$(echo "$CONCEPT" | grep -o '"logline":"[^"]*"' | head -1)
    echo "✅ 成功 (${DURATION}秒)"
    echo "  $LOGLINE"
else
    echo "❌ 失敗 (${DURATION}秒)"
    echo "  返回: $(echo "$CONCEPT" | head -c 200)"
    exit 1
fi

echo ""
echo "【Step 2】章節拆分 (Narrative Agent)"
echo -n "  調用API... "
START=$(date +%s)
CHAPTERS=$(curl -s -X POST "$API/api/agent/narrative" \
    -H "Content-Type: application/json" \
    -d "{\"content\": \"$NOVEL\"}" \
    --max-time 60 2>/dev/null)
END=$(date +%s)
DURATION=$((END-START))

if echo "$CHAPTERS" | grep -q 'result'; then
    echo "✅ 成功 (${DURATION}秒)"
    echo "  返回長度: $(echo "$CHAPTERS" | wc -c) 字符"
else
    echo "❌ 失敗 (${DURATION}秒)"
    echo "  返回: $(echo "$CHAPTERS" | head -c 200)"
    exit 1
fi

echo ""
echo "【Step 3】角色設計 (Character Agent)"
echo -n "  調用API... "
START=$(date +%s)
CHARS=$(curl -s -X POST "$API/api/agent/character" \
    -H "Content-Type: application/json" \
    -d "{\"content\": \"$NOVEL\"}" \
    --max-time 60 2>/dev/null)
END=$(date +%s)
DURATION=$((END-START))

if echo "$CHARS" | grep -q 'result'; then
    echo "✅ 成功 (${DURATION}秒)"
    echo "  返回長度: $(echo "$CHARS" | wc -c) 字符"
else
    echo "❌ 失敗 (${DURATION}秒)"
    echo "  返回: $(echo "$CHARS" | head -c 200)"
    exit 1
fi

echo ""
echo "【Step 4】分鏡設計 (Storyboard Agent)"
echo -n "  調用API... "
START=$(date +%s)
STORYBOARD=$(curl -s -X POST "$API/api/agent/storyboard" \
    -H "Content-Type: application/json" \
    -d "{\"content\": \"$NOVEL\"}" \
    --max-time 60 2>/dev/null)
END=$(date +%s)
DURATION=$((END-START))

if echo "$STORYBOARD" | grep -q 'result'; then
    echo "✅ 成功 (${DURATION}秒)"
    echo "  返回長度: $(echo "$STORYBOARD" | wc -c) 字符"
else
    echo "❌ 失敗 (${DURATION}秒)"
    echo "  返回: $(echo "$STORYBOARD" | head -c 200)"
    exit 1
fi

echo ""
echo "【Step 5】前端頁面檢查"
echo -n "  加載首頁... "
PAGE=$(curl -s "$API/" --max-time 10 2>/dev/null)
if echo "$PAGE" | grep -q 'FizzDragon'; then
    echo "✅ OK"
else
    echo "❌ 失敗"
    exit 1
fi

echo -n "  版本選擇UI... "
if echo "$PAGE" | grep -q 'selectVersion'; then
    echo "✅ OK"
else
    echo "❌ 缺失"
    exit 1
fi

echo -n "  跳過按鈕... "
if echo "$PAGE" | grep -q 'skipInterview'; then
    echo "✅ OK"
else
    echo "❌ 缺失"
    exit 1
fi

echo ""
echo "============================================================"
echo "✅ 全部測試通過！"
echo "============================================================"
