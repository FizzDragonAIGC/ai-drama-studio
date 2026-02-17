#!/bin/bash
# 千与千寻三种模式测试脚本

API_URL="http://localhost:3001"
NOVEL="《千与千寻》宫崎骏2001年作品。10岁少女千寻与父母搬家途中，误入神灵世界。父母因贪吃被变成猪。千寻为拯救父母，在汤婆婆经营的油屋澡堂工作，结识白龙、锅炉爷爷、小玲等。经历河神洗浴、无脸男暴走、�的婆婆之旅等冒险，最终想起白龙真名，通过汤婆婆考验，带父母回到人间。主题：成长、贪婪批判、环保、记忆与名字。"

echo "=========================================="
echo "千与千寻 三模式测试"
echo "=========================================="

# 模式1: 极速版
echo ""
echo "[1/3] 极速版 (5集×3分钟)"
echo "---"
START=$(date +%s)
curl -s -X POST "$API_URL/api/agent/shot_density" \
  -H "Content-Type: application/json" \
  -d "{\"content\": \"$NOVEL\n\n第1集《迷途》(3分钟)：搬家路上→红色隧道→无人小镇→父母变猪→白龙出现\n请计算镜头数量。\"}" | jq '.result' | head -5
END=$(date +%s)
echo "极速版用时: $((END-START))秒"

# 模式2: 标准版
echo ""
echo "[2/3] 标准版 (10集×5分钟)"
echo "---"
START=$(date +%s)
curl -s -X POST "$API_URL/api/agent/shot_density" \
  -H "Content-Type: application/json" \
  -d "{\"content\": \"$NOVEL\n\n第1集《迷途》(5分钟)：\n场景1-搬家路上(1分钟)\n场景2-红色隧道(1分钟)\n场景3-无人小镇(1分钟)\n场景4-父母变猪(1分钟)\n场景5-白龙登场(1分钟)\n请计算镜头数量。\"}" | jq '.result' | head -5
END=$(date +%s)
echo "标准版用时: $((END-START))秒"

# 模式3: 专业版
echo ""
echo "[3/3] 专业版 (20集×10分钟)"
echo "---"
START=$(date +%s)
curl -s -X POST "$API_URL/api/agent/shot_density" \
  -H "Content-Type: application/json" \
  -d "{\"content\": \"$NOVEL\n\n第1集《迷途》(10分钟)：\n场景1-搬家路上(2分钟)：车内对话，千寻心情，枯萎花束\n场景2-迷路森林(1.5分钟)：森林氛围，父亲迷路\n场景3-红色隧道(2分钟)：隧道入口，穿越过程，光明出口\n场景4-无人小镇(2分钟)：小镇全景，探索，诡异氛围\n场景5-美食诱惑(1.5分钟)：食物香气，父母贪吃，千寻警告\n场景6-白龙登场(1分钟)：油屋初现，白龙警告，命运相遇\n请计算镜头数量和HERO SHOT。\"}" | jq '.result' | head -10
END=$(date +%s)
echo "专业版用时: $((END-START))秒"

echo ""
echo "=========================================="
echo "测试完成"
echo "=========================================="
