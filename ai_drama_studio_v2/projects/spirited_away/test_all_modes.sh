#!/bin/bash
# 千与千寻 - 5种模式完整测试

API_BASE="http://34.58.33.115:3001"
PROJECT_DIR="/home/beerbear/.openclaw/workspace/ai_drama_studio_v2/projects/spirited_away"
SOURCE_FILE="$PROJECT_DIR/source.md"
NOVEL_CONTENT=$(cat "$SOURCE_FILE")

# 创建输出目录
mkdir -p "$PROJECT_DIR/results"

# 测试函数
run_test() {
    local MODE=$1
    local EPISODES=$2
    local DURATION=$3
    local TEST_NAME="${MODE}_${EPISODES}ep_${DURATION}min"
    
    echo "=========================================="
    echo "测试: $TEST_NAME"
    echo "模式: $MODE | 集数: $EPISODES | 时长: ${DURATION}分钟/集"
    echo "=========================================="
    
    OUTPUT_DIR="$PROJECT_DIR/results/$TEST_NAME"
    mkdir -p "$OUTPUT_DIR"
    
    START_TIME=$(date +%s)
    
    # 1. Interview
    echo "[1/7] 运行 Interview Agent..."
    curl -s -X POST "$API_BASE/api/agent/interview" \
        -H "Content-Type: application/json" \
        -d "{\"novel\":\"$NOVEL_CONTENT\",\"title\":\"千与千寻\",\"author\":\"宫崎骏\"}" \
        > "$OUTPUT_DIR/01_interview.json" 2>&1
    echo "完成 ✓"
    
    INTERVIEW=$(cat "$OUTPUT_DIR/01_interview.json" | jq -r '.result // .response // .')
    
    # 2. Concept
    echo "[2/7] 运行 Concept Agent..."
    curl -s -X POST "$API_BASE/api/agent/concept" \
        -H "Content-Type: application/json" \
        -d "{\"novel\":\"$NOVEL_CONTENT\",\"title\":\"千与千寻\",\"interview\":\"$INTERVIEW\"}" \
        > "$OUTPUT_DIR/02_concept.json" 2>&1
    echo "完成 ✓"
    
    CONCEPT=$(cat "$OUTPUT_DIR/02_concept.json" | jq -r '.result // .response // .')
    
    # 3. Chapters
    echo "[3/7] 运行 Chapters Agent (${EPISODES}集)..."
    curl -s -X POST "$API_BASE/api/agent/chapters" \
        -H "Content-Type: application/json" \
        -d "{\"novel\":\"$NOVEL_CONTENT\",\"title\":\"千与千寻\",\"episodes\":$EPISODES,\"duration\":$DURATION,\"interview\":\"$INTERVIEW\",\"concept\":\"$CONCEPT\"}" \
        > "$OUTPUT_DIR/03_chapters.json" 2>&1
    echo "完成 ✓"
    
    CHAPTERS=$(cat "$OUTPUT_DIR/03_chapters.json" | jq -r '.result // .response // .')
    
    # 4. Characters
    echo "[4/7] 运行 Character Agent..."
    curl -s -X POST "$API_BASE/api/agent/character" \
        -H "Content-Type: application/json" \
        -d "{\"novel\":\"$NOVEL_CONTENT\",\"title\":\"千与千寻\",\"interview\":\"$INTERVIEW\",\"concept\":\"$CONCEPT\"}" \
        > "$OUTPUT_DIR/04_characters.json" 2>&1
    echo "完成 ✓"
    
    CHARACTERS=$(cat "$OUTPUT_DIR/04_characters.json" | jq -r '.result // .response // .')
    
    # 5. Art Director
    echo "[5/7] 运行 ArtDirector Agent..."
    curl -s -X POST "$API_BASE/api/agent/artdirector" \
        -H "Content-Type: application/json" \
        -d "{\"novel\":\"$NOVEL_CONTENT\",\"title\":\"千与千寻\",\"interview\":\"$INTERVIEW\",\"concept\":\"$CONCEPT\",\"characters\":\"$CHARACTERS\"}" \
        > "$OUTPUT_DIR/05_artdirector.json" 2>&1
    echo "完成 ✓"
    
    ARTDIRECTOR=$(cat "$OUTPUT_DIR/05_artdirector.json" | jq -r '.result // .response // .')
    
    # 6. Screenwriter
    echo "[6/7] 运行 Screenwriter Agent..."
    curl -s -X POST "$API_BASE/api/agent/screenwriter" \
        -H "Content-Type: application/json" \
        -d "{\"novel\":\"$NOVEL_CONTENT\",\"title\":\"千与千寻\",\"episodes\":$EPISODES,\"duration\":$DURATION,\"interview\":\"$INTERVIEW\",\"concept\":\"$CONCEPT\",\"chapters\":\"$CHAPTERS\",\"characters\":\"$CHARACTERS\"}" \
        > "$OUTPUT_DIR/06_screenwriter.json" 2>&1
    echo "完成 ✓"
    
    SCRIPT=$(cat "$OUTPUT_DIR/06_screenwriter.json" | jq -r '.result // .response // .')
    
    # 7. Storyboard
    echo "[7/7] 运行 Storyboard Agent..."
    curl -s -X POST "$API_BASE/api/agent/storyboard" \
        -H "Content-Type: application/json" \
        -d "{\"novel\":\"$NOVEL_CONTENT\",\"title\":\"千与千寻\",\"episodes\":$EPISODES,\"duration\":$DURATION,\"interview\":\"$INTERVIEW\",\"concept\":\"$CONCEPT\",\"chapters\":\"$CHAPTERS\",\"characters\":\"$CHARACTERS\",\"artdirector\":\"$ARTDIRECTOR\",\"script\":\"$SCRIPT\"}" \
        > "$OUTPUT_DIR/07_storyboard.json" 2>&1
    echo "完成 ✓"
    
    END_TIME=$(date +%s)
    ELAPSED=$((END_TIME - START_TIME))
    
    echo ""
    echo "测试 $TEST_NAME 完成!"
    echo "耗时: ${ELAPSED}秒"
    echo "输出目录: $OUTPUT_DIR"
    echo ""
}

# 运行5种模式测试
echo "开始《千与千寻》5模式完整测试"
echo "=========================================="

# 1. 极速版 30集 5分钟
run_test "lite" 30 5

# 2. 极速版 100集 2分钟
run_test "lite" 100 2

# 3. 标准版 5集 10分钟
run_test "standard" 5 10

# 4. 标准版 24集 8分钟
run_test "standard" 24 8

# 5. 专业版 40集 10分钟
run_test "pro" 40 10

echo "=========================================="
echo "所有测试完成!"
echo "结果保存在: $PROJECT_DIR/results/"
