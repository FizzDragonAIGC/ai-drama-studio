#!/bin/bash
# 《七娃》完整测试脚本

NOVEL=$(cat /home/beerbear/.openclaw/workspace/ai_drama_studio_v2/test_novels/qiwa.txt)
OUTPUT_DIR="/home/beerbear/.openclaw/workspace/ai_drama_studio_v2/test_output"
mkdir -p $OUTPUT_DIR

echo "=========================================="
echo "《七娃》AI番劇工作台完整測試"
echo "=========================================="
echo ""

# Step 1: 創意訪談
echo "⏳ Step 1/5: 創意訪談..."
START=$(date +%s)
curl -s -X POST http://localhost:3001/api/agent/interview \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg content "$NOVEL" '{content: $content}')" \
  --max-time 180 > $OUTPUT_DIR/1_interview.json
END=$(date +%s)
echo "✅ 完成 ($((END-START))秒)"

# Step 2: 高概念
echo "⏳ Step 2/5: 高概念生成..."
START=$(date +%s)
curl -s -X POST http://localhost:3001/api/agent/concept \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg content "$NOVEL" '{content: $content}')" \
  --max-time 180 > $OUTPUT_DIR/2_concept.json
END=$(date +%s)
echo "✅ 完成 ($((END-START))秒)"

# Step 3: 章節拆分
echo "⏳ Step 3/5: 章節拆分..."
START=$(date +%s)
curl -s -X POST http://localhost:3001/api/agent/narrative \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg content "$NOVEL" '{content: $content}')" \
  --max-time 180 > $OUTPUT_DIR/3_chapters.json
END=$(date +%s)
echo "✅ 完成 ($((END-START))秒)"

# Step 4: 角色設計
echo "⏳ Step 4/5: 角色設計..."
START=$(date +%s)
curl -s -X POST http://localhost:3001/api/agent/character \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg content "$NOVEL" '{content: $content}')" \
  --max-time 180 > $OUTPUT_DIR/4_characters.json
END=$(date +%s)
echo "✅ 完成 ($((END-START))秒)"

# Step 5: 分鏡設計
echo "⏳ Step 5/5: 分鏡設計..."
START=$(date +%s)
curl -s -X POST http://localhost:3001/api/agent/storyboard \
  -H "Content-Type: application/json" \
  -d "$(jq -n --arg content "$NOVEL" '{content: $content}')" \
  --max-time 180 > $OUTPUT_DIR/5_storyboard.json
END=$(date +%s)
echo "✅ 完成 ($((END-START))秒)"

echo ""
echo "=========================================="
echo "測試完成！結果保存在 $OUTPUT_DIR"
echo "=========================================="
ls -la $OUTPUT_DIR
