// ===== 全局状态 =====
const state = {
    currentStep: 'input',
    story: '',
    config: {
        directorStyle: 'auto',
        era: '',
        duration: 8,
        aspectRatio: '21:9'
    },
    chapters: [],
    // 人物设定
    characters: [],
    // 时代背景
    eraDetails: {
        period: '',
        location: '',
        culture: [],
        clothing: [],
        architecture: [],
        props: [],
        taboos: [],
        references: []
    },
    emotions: [],
    shots: [],
    prompts: {
        image: [],
        video: [],
        music: []
    }
};

// ===== 步骤顺序 =====
const stepOrder = ['input', 'chapter', 'character', 'emotion', 'storyboard', 'output'];

// ===== 智能体定义 =====
const agents = {
    producer: { name: '制片人', icon: '🎬', status: 'waiting' },
    writer: { name: '编剧', icon: '📝', status: 'waiting' },
    eraConsultant: { name: '时代顾问', icon: '📜', status: 'waiting' },
    costumeDesigner: { name: '服化道设计师', icon: '👗', status: 'waiting' },
    emotionDesigner: { name: '情绪设计师', icon: '🎭', status: 'waiting' },
    director: { name: '导演', icon: '🎥', status: 'waiting' },
    storyboard: { name: '分镜师', icon: '📐', status: 'waiting' },
    art: { name: '美术指导', icon: '🎨', status: 'waiting' },
    camera: { name: '摄影指导', icon: '📷', status: 'waiting' },
    lighting: { name: '灯光指导', icon: '💡', status: 'waiting' },
    colorist: { name: '调色师', icon: '🌈', status: 'waiting' },
    acting: { name: '表演指导', icon: '🎭', status: 'waiting' },
    composer: { name: '配乐师', icon: '🎵', status: 'waiting' },
    soundDesign: { name: '音效师', icon: '🔊', status: 'waiting' }
};

// ===== 导演风格库 =====
const directorStyles = {
    auto: { name: '自动匹配', color: '自然色调', lighting: '自然', tempo: '中等' },
    hou: { name: '侯孝贤', color: '低饱和暖黄', lighting: '自然光为主', tempo: '缓慢' },
    wong: { name: '王家卫', color: '霓虹高饱和', lighting: '霓虹灯、暧昧', tempo: '碎片化' },
    jiang: { name: '姜文', color: '饱满明亮', lighting: '高对比', tempo: '有力' },
    ang: { name: '李安', color: '细腻自然', lighting: '柔和', tempo: '流畅' },
    ghibli: { name: '宫崎骏', color: '温暖明亮', lighting: '梦幻', tempo: '轻快' },
    nolan: { name: '诺兰', color: '冷峻蓝灰', lighting: '高对比', tempo: '紧张' }
};

// ===== 分镜层级 =====
const shotLayers = {
    narrative: { name: '📖 叙事', desc: '交代信息，讲清故事' },
    dramatic: { name: '🎯 戏剧', desc: '强化冲突，推动主线' },
    emotional: { name: '🎨 情绪', desc: '艺术表达，营造氛围' }
};

// ===== 页面初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    updateAgentStatus();
});

// ===== 开始创作流程 =====
function startProcess() {
    const storyInput = document.getElementById('storyInput').value.trim();
    
    if (!storyInput) {
        addChatMessage('system', '请先输入你的故事或创意！');
        return;
    }
    
    if (storyInput.length < 50) {
        addChatMessage('system', '故事内容太短了，请输入更多内容（至少50字）');
        return;
    }
    
    // 保存状态
    state.story = storyInput;
    state.config = {
        directorStyle: document.getElementById('directorStyle').value,
        era: document.getElementById('eraInput').value || '现代',
        duration: parseInt(document.getElementById('duration').value),
        aspectRatio: document.getElementById('aspectRatio').value
    };
    
    // 激活智能体
    setAgentStatus('producer', 'working');
    addChatMessage('agent', `
        <div class="agent-header">🎬 制片人</div>
        <p>收到！正在分析你的故事（${storyInput.length}字）...</p>
        <p><strong>导演风格：</strong>${directorStyles[state.config.directorStyle].name}</p>
        <p><strong>年代设定：</strong>${state.config.era}</p>
        <p><strong>每集时长：</strong>${state.config.duration}分钟</p>
    `);
    
    // 模拟处理
    setTimeout(() => {
        setAgentStatus('producer', 'done');
        setAgentStatus('writer', 'working');
        
        addChatMessage('agent', `
            <div class="agent-header">📝 编剧</div>
            <p>正在分析故事结构，规划章节...</p>
        `);
        
        setTimeout(() => {
            generateChapters();
            setAgentStatus('writer', 'done');
            goToStep('chapter');
        }, 1500);
    }, 1000);
}

// ===== 生成章节规划 =====
function generateChapters() {
    const story = state.story;
    const duration = state.config.duration;
    
    const paragraphs = story.split(/\n\n+/).filter(p => p.trim().length > 0);
    const totalLength = story.length;
    
    const charsPerMinute = 500;
    const totalMinutes = Math.ceil(totalLength / charsPerMinute);
    const numChapters = Math.max(1, Math.ceil(totalMinutes / duration));
    
    const chaptersData = [];
    const parasPerChapter = Math.ceil(paragraphs.length / numChapters);
    
    for (let i = 0; i < numChapters; i++) {
        const startPara = i * parasPerChapter;
        const endPara = Math.min(startPara + parasPerChapter, paragraphs.length);
        const chapterParas = paragraphs.slice(startPara, endPara);
        const chapterText = chapterParas.join('\n\n');
        
        const summary = chapterText.substring(0, 150).replace(/\n/g, ' ') + '...';
        const highlight = extractHighlight(chapterText);
        
        chaptersData.push({
            id: i + 1,
            title: `第${i + 1}集`,
            range: `段落 ${startPara + 1}-${endPara}`,
            duration: Math.min(duration, Math.ceil(chapterText.length / charsPerMinute)),
            summary: summary,
            highlight: highlight,
            whyInteresting: analyzeInterest(chapterText),
            originalText: chapterText
        });
    }
    
    state.chapters = chaptersData;
    renderChapters();
}

// ===== 提取看点 =====
function extractHighlight(text) {
    const emotionWords = ['爱', '恨', '怕', '喜', '怒', '哀', '乐', '惊', '悲', '欢', 
                          '泪', '笑', '哭', '吼', '叫', '死', '生', '杀', '救'];
    
    const sentences = text.split(/[。！？]/);
    for (const sentence of sentences) {
        for (const word of emotionWords) {
            if (sentence.includes(word) && sentence.length > 10 && sentence.length < 50) {
                return sentence.trim();
            }
        }
    }
    
    const dialogMatch = text.match(/["「『]([^"」』]{10,40})["」』]/);
    if (dialogMatch) {
        return dialogMatch[1];
    }
    
    for (const sentence of sentences) {
        if (sentence.trim().length > 15 && sentence.trim().length < 60) {
            return sentence.trim();
        }
    }
    
    return text.substring(0, 50) + '...';
}

// ===== 分析为什么有趣 =====
function analyzeInterest(text) {
    const interests = [];
    
    if (text.includes('？') || text.includes('?')) interests.push('有悬念');
    if (text.match(/["「『][^"」』]+["」』]/)) interests.push('有对话');
    if (text.match(/[！!]{1,}/)) interests.push('有冲突');
    if (text.match(/[泪哭悲伤痛]/)) interests.push('有情感张力');
    if (text.match(/[笑喜乐欢开心]/)) interests.push('有欢乐时刻');
    
    if (interests.length === 0) interests.push('铺垫情节');
    
    return interests.join('，');
}

// ===== 渲染章节（可编辑） =====
function renderChapters() {
    const container = document.getElementById('chapterOutput');
    container.innerHTML = `
        <div style="margin-bottom: 20px; padding: 15px; background: rgba(79,172,254,0.1); border-radius: 10px;">
            <strong>📊 分析结果：</strong>
            故事共 ${state.story.length} 字，分为 ${state.chapters.length} 集
            <br><small style="color: #888;">💡 点击任意文字可编辑</small>
        </div>
        ${state.chapters.map((ch, idx) => `
            <div class="chapter-card" data-chapter-id="${idx}">
                <h3>
                    <input type="text" class="editable-input" value="${ch.title}" 
                           onchange="updateChapter(${idx}, 'title', this.value)">
                </h3>
                <div class="meta">
                    <span>📖 ${ch.range}</span>
                    <span>⏱️ 约
                        <input type="number" class="editable-input small" value="${ch.duration}" min="1" max="15"
                               onchange="updateChapter(${idx}, 'duration', this.value)">
                    分钟</span>
                </div>
                <div class="input-group">
                    <label>摘要</label>
                    <textarea class="editable-textarea" onchange="updateChapter(${idx}, 'summary', this.value)">${ch.summary}</textarea>
                </div>
                <div class="highlight">
                    <div class="highlight-label">✨ 核心看点</div>
                    <input type="text" class="editable-input full" value="${ch.highlight}"
                           onchange="updateChapter(${idx}, 'highlight', this.value)">
                </div>
                <div class="highlight" style="border-color: rgba(79,172,254,0.3); background: rgba(79,172,254,0.1);">
                    <div class="highlight-label" style="color: var(--accent-blue);">💡 为什么有趣</div>
                    <input type="text" class="editable-input full" value="${ch.whyInteresting}"
                           onchange="updateChapter(${idx}, 'whyInteresting', this.value)">
                </div>
            </div>
        `).join('')}
    `;
}

// ===== 更新章节数据 =====
function updateChapter(idx, field, value) {
    state.chapters[idx][field] = value;
    addChatMessage('system', `✏️ 已更新第${idx + 1}集的${field}`);
}

// ===== 生成情绪节拍 - 完整版（60-80个镜头） =====
function generateEmotions() {
    setAgentStatus('emotionDesigner', 'working');
    
    const currentChapter = state.chapters[0];
    const durationMinutes = currentChapter?.duration || state.config.duration;
    const totalSeconds = durationMinutes * 60;
    const avgShotDuration = 6; // 平均6秒一个镜头
    const targetShots = Math.ceil(totalSeconds / avgShotDuration);
    
    addChatMessage('agent', `
        <div class="agent-header">🎭 情绪设计师</div>
        <p>正在分析第一集的情绪节奏...</p>
        <p>时长 ${durationMinutes} 分钟 → 预计生成 <strong>${targetShots}</strong> 个镜头</p>
    `);
    
    setTimeout(() => {
        const text = currentChapter?.originalText || state.story.substring(0, 2000);
        state.emotions = generateEmotionsFromText(text, targetShots);
        
        setAgentStatus('emotionDesigner', 'done');
        renderEmotions();
    }, 2000);
}

// ===== 从文本生成情绪节拍（完整数量） =====
function generateEmotionsFromText(text, targetCount) {
    const sentences = text.split(/[。！？\n]+/).filter(s => s.trim().length > 3);
    const emotions = [];
    
    // 确保生成足够的镜头
    const beatsCount = Math.max(targetCount, 60);
    
    let timeOffset = 0;
    
    for (let i = 0; i < beatsCount; i++) {
        // 循环使用句子
        const sentenceIdx = i % sentences.length;
        const sentence = sentences[sentenceIdx] || `场景${i + 1}`;
        
        const emotion = analyzeEmotion(sentence);
        const duration = 4 + Math.floor(Math.random() * 5); // 4-8秒
        
        const startTime = formatTime(timeOffset);
        timeOffset += duration;
        const endTime = formatTime(timeOffset);
        
        // 决定分镜层级
        let layer = 'narrative';
        if (emotion.intensity >= 7) layer = 'dramatic';
        if (i % 5 === 0 && emotion.intensity >= 5) layer = 'emotional'; // 每5个镜头插入一个情绪镜头
        
        emotions.push({
            id: i + 1,
            time: `${startTime}-${endTime}`,
            durationSec: duration,
            emotion: emotion.type,
            intensity: emotion.intensity,
            content: sentence.substring(0, 25) + (sentence.length > 25 ? '...' : ''),
            fullContent: sentence,
            layer: layer,
            status: emotion.intensity >= 7 ? 'peak' : (emotion.intensity <= 3 ? 'warn' : 'ok'),
            statusText: emotion.intensity >= 8 ? '🔝 高光点' : 
                       (emotion.intensity >= 6 ? '✅ OK' : 
                       (emotion.intensity <= 3 ? '⚠️ 可优化' : '铺垫'))
        });
    }
    
    return emotions;
}

// ===== 分析情绪 =====
function analyzeEmotion(text) {
    const emotionMap = {
        '惊': { type: '惊讶', base: 7 },
        '怕': { type: '恐惧', base: 6 },
        '恐': { type: '恐惧', base: 7 },
        '爱': { type: '爱意', base: 8 },
        '恨': { type: '愤怒', base: 7 },
        '怒': { type: '愤怒', base: 8 },
        '哭': { type: '悲伤', base: 7 },
        '泪': { type: '悲伤', base: 6 },
        '笑': { type: '喜悦', base: 6 },
        '喜': { type: '喜悦', base: 7 },
        '乐': { type: '欢乐', base: 6 },
        '死': { type: '震撼', base: 9 },
        '杀': { type: '紧张', base: 8 },
        '跑': { type: '紧张', base: 5 },
        '等': { type: '期待', base: 5 },
        '想': { type: '思念', base: 5 },
        '看': { type: '好奇', base: 4 },
        '说': { type: '对话', base: 4 },
        '走': { type: '平静', base: 3 },
    };
    
    let maxEmotion = { type: '平静', intensity: 3 + Math.floor(Math.random() * 2) };
    
    for (const [char, emotion] of Object.entries(emotionMap)) {
        if (text.includes(char)) {
            const intensity = emotion.base + Math.floor(Math.random() * 2);
            if (intensity > maxEmotion.intensity) {
                maxEmotion = { type: emotion.type, intensity: Math.min(10, intensity) };
            }
        }
    }
    
    if (text.includes('！') || text.includes('!')) {
        maxEmotion.intensity = Math.min(10, maxEmotion.intensity + 1);
    }
    if (text.match(/["「『]/)) {
        maxEmotion.intensity = Math.min(10, maxEmotion.intensity + 1);
    }
    
    return maxEmotion;
}

// ===== 格式化时间 =====
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
}

// ===== 渲染情绪设计（可编辑 + 完整表格） =====
function renderEmotions() {
    const curveContainer = document.getElementById('emotionCurve');
    
    // 只显示前20个的曲线预览
    const previewEmotions = state.emotions.slice(0, 20);
    
    curveContainer.innerHTML = `
        <h4 style="margin-bottom: 15px; color: var(--text-secondary);">
            📈 情绪曲线预览（显示前20个，共${state.emotions.length}个镜头）
        </h4>
        <div class="emotion-curve">
            ${previewEmotions.map(e => `
                <div class="emotion-bar" style="height: ${e.intensity * 10}%;" title="${e.emotion}: ${e.content}">
                    <span class="intensity">${e.intensity}</span>
                </div>
            `).join('')}
        </div>
        <div style="margin-top: 15px; display: flex; gap: 20px; font-size: 0.85em;">
            <span>📖 叙事: ${state.emotions.filter(e => e.layer === 'narrative').length}个</span>
            <span>🎯 戏剧: ${state.emotions.filter(e => e.layer === 'dramatic').length}个</span>
            <span>🎨 情绪: ${state.emotions.filter(e => e.layer === 'emotional').length}个</span>
        </div>
    `;
    
    // 完整表格（可编辑）
    const tableContainer = document.getElementById('emotionTable');
    tableContainer.innerHTML = `
        <div style="margin-bottom: 10px; color: #888;">
            💡 双击单元格可编辑 | 共 <strong>${state.emotions.length}</strong> 个镜头
        </div>
        <div style="max-height: 400px; overflow-y: auto;">
            <table class="emotion-table">
                <thead>
                    <tr>
                        <th>序号</th>
                        <th>时间</th>
                        <th>层级</th>
                        <th>情绪</th>
                        <th>强度</th>
                        <th>内容</th>
                        <th>评估</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.emotions.map((e, idx) => `
                        <tr>
                            <td>${String(e.id).padStart(2, '0')}</td>
                            <td>${e.time}</td>
                            <td>
                                <select class="mini-select" onchange="updateEmotion(${idx}, 'layer', this.value)">
                                    <option value="narrative" ${e.layer === 'narrative' ? 'selected' : ''}>📖 叙事</option>
                                    <option value="dramatic" ${e.layer === 'dramatic' ? 'selected' : ''}>🎯 戏剧</option>
                                    <option value="emotional" ${e.layer === 'emotional' ? 'selected' : ''}>🎨 情绪</option>
                                </select>
                            </td>
                            <td>
                                <input type="text" class="mini-input" value="${e.emotion}" 
                                       onchange="updateEmotion(${idx}, 'emotion', this.value)">
                            </td>
                            <td>
                                <input type="number" class="mini-input" value="${e.intensity}" min="1" max="10"
                                       onchange="updateEmotion(${idx}, 'intensity', parseInt(this.value))">
                            </td>
                            <td>
                                <input type="text" class="mini-input wide" value="${e.content}" 
                                       onchange="updateEmotion(${idx}, 'content', this.value)">
                            </td>
                            <td><span class="status-tag ${e.status}">${e.statusText}</span></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// ===== 更新情绪数据 =====
function updateEmotion(idx, field, value) {
    state.emotions[idx][field] = value;
    // 重新计算状态
    if (field === 'intensity') {
        const intensity = value;
        state.emotions[idx].status = intensity >= 7 ? 'peak' : (intensity <= 3 ? 'warn' : 'ok');
        state.emotions[idx].statusText = intensity >= 8 ? '🔝 高光点' : 
                                         (intensity >= 6 ? '✅ OK' : 
                                         (intensity <= 3 ? '⚠️ 可优化' : '铺垫'));
    }
}

// ===== 生成分镜（包含所有智能体输出） =====
function generateStoryboard() {
    // 激活所有智能体
    setAgentStatus('storyboard', 'working');
    setAgentStatus('art', 'working');
    setAgentStatus('camera', 'working');
    setAgentStatus('lighting', 'working');
    setAgentStatus('colorist', 'working');
    setAgentStatus('acting', 'working');
    setAgentStatus('composer', 'working');
    setAgentStatus('soundDesign', 'working');
    
    addChatMessage('agent', `
        <div class="agent-header">🤖 全部12个智能体协同工作中</div>
        <p>📐分镜师 + 🎨美术 + 📷摄影 + 💡灯光 + 🌈调色 + 🎭表演 + 🎵配乐 + 🔊音效 + 🎥导演</p>
        <p>生成 <strong>${state.emotions.length}</strong> 个镜头 × 12个智能体 = <strong>${state.emotions.length * 12}</strong> 条输出</p>
    `);
    
    setTimeout(() => {
        state.shots = state.emotions.map((e, i) => generateShotFromEmotion(e, i + 1));
        
        // 完成所有智能体
        setAgentStatus('storyboard', 'done');
        setAgentStatus('art', 'done');
        setAgentStatus('camera', 'done');
        setAgentStatus('lighting', 'done');
        setAgentStatus('colorist', 'done');
        setAgentStatus('acting', 'done');
        setAgentStatus('composer', 'done');
        setAgentStatus('soundDesign', 'done');
        
        renderStoryboard();
    }, 2500);
}

// ===== 根据情绪生成完整分镜（所有智能体） =====
function generateShotFromEmotion(emotion, shotNum) {
    const style = directorStyles[state.config.directorStyle] || directorStyles.auto;
    const intensity = emotion.intensity;
    
    // 📐 分镜师
    let shotType, movement, composition, angle;
    if (intensity >= 9) {
        shotType = '特写';
        movement = '缓慢推近';
        composition = '中心构图，浅景深';
        angle = '平视/略仰';
    } else if (intensity >= 7) {
        shotType = '近景';
        movement = '跟拍/轻摇';
        composition = '三分法，主体偏移';
        angle = '平视';
    } else if (intensity >= 5) {
        shotType = '中景';
        movement = '固定/轻微平移';
        composition = '自然构图';
        angle = '平视';
    } else {
        shotType = '全景';
        movement = '固定';
        composition = '对称/环境展示';
        angle = '略高角度';
    }
    
    // 🎨 美术指导
    const artNotes = {
        costume: `${state.config.era}风格，符合人物身份`,
        props: intensity >= 7 ? '强调关键道具' : '环境道具自然摆放',
        setDesign: emotion.layer === 'emotional' ? '强化氛围元素' : '写实风格',
        colorPalette: style.color
    };
    
    // 📷 摄影指导
    const cameraNotes = {
        aperture: intensity >= 8 ? 'f/1.4-1.8' : (intensity >= 5 ? 'f/2.8-4' : 'f/5.6-8'),
        focalLength: shotType === '特写' ? '85-135mm' : (shotType === '全景' ? '24-35mm' : '50mm'),
        iso: '400-800',
        whiteBalance: style.name.includes('王家卫') ? '3200K暖调' : '5600K自然',
        filmStock: '35mm胶片质感',
        depthOfField: intensity >= 7 ? '浅景深，背景虚化' : '正常景深'
    };
    
    // 💡 灯光指导
    const lightingNotes = {
        keyLight: intensity >= 7 ? '侧光45°，强调轮廓' : '柔和主光，正面偏侧',
        keyIntensity: intensity >= 7 ? '强' : '中等',
        fillLight: emotion.emotion.includes('悲') ? '弱补光1:4，高对比' : '适度补光1:2',
        backLight: intensity >= 8 ? '轮廓光勾边' : '自然环境',
        practicalLight: emotion.layer === 'emotional' ? '场景光源参与叙事（窗光/灯光）' : '自然环境光',
        lightingRatio: intensity >= 7 ? '1:4高对比' : '1:2柔和',
        mood: style.lighting
    };
    
    // 🌈 调色师
    const colorNotes = {
        colorTemp: getColorTemp(emotion.emotion, style),
        saturation: intensity >= 7 ? '高饱和' : (intensity <= 3 ? '低饱和' : '正常'),
        contrast: intensity >= 7 ? '高对比' : '正常对比',
        lut: getLUT(emotion.emotion, style),
        highlights: emotion.emotion.includes('喜') ? '暖黄高光' : '自然',
        shadows: emotion.emotion.includes('悲') ? '冷蓝阴影' : '自然',
        grade: style.color
    };
    
    // 🎭 表演指导
    const actingNotes = {
        emotion: emotion.emotion,
        expression: getExpression(emotion.emotion, intensity),
        bodyLanguage: getBodyLanguage(emotion.emotion, intensity),
        eyeLine: intensity >= 7 ? '直视镜头/对手' : '自然视线',
        tempo: intensity >= 7 ? '情绪饱满，节奏紧凑' : '自然舒缓',
        subtext: getSubtext(emotion)
    };
    
    // 🎵 配乐师 - 完整音乐分轨
    const musicNotes = {
        // 主旋律
        mainMelody: {
            active: intensity >= 5,
            instruments: getMainInstruments(emotion.emotion, style),
            volume: intensity >= 7 ? '强 (ff)' : (intensity >= 5 ? '中强 (mf)' : '静默'),
            dynamics: getMainDynamics(emotion, shotNum),
            prompt: generateMusicPrompt(emotion, style, 'main')
        },
        // 副旋律
        subMelody: {
            active: intensity >= 4,
            instruments: getSubInstruments(emotion.emotion, style),
            volume: intensity >= 6 ? '中等 (mp)' : '弱 (p)',
            dynamics: getSubDynamics(emotion, shotNum),
            prompt: generateMusicPrompt(emotion, style, 'sub')
        },
        // 环境音/垫底
        ambientTrack: {
            active: true,
            type: getAmbientType(emotion),
            volume: '背景层 (pp)',
            prompt: generateMusicPrompt(emotion, style, 'ambient')
        },
        // 整体信息
        tempo: getTempo(emotion.intensity),
        key: emotion.emotion.includes('悲') || emotion.emotion.includes('恐') ? '小调 (minor)' : '大调 (major)',
        bpm: getBPM(emotion.intensity),
        startTime: emotion.time.split('-')[0],
        endTime: emotion.time.split('-')[1],
        transition: getMusicTransition(emotion, shotNum)
    };
    
    // 🔊 音效师
    const soundNotes = {
        ambience: getAmbience(emotion),
        foley: '脚步、衣物摩擦',
        sfx: emotion.layer === 'emotional' ? '强化情绪音效' : '自然环境音',
        silence: intensity >= 8 ? '可用静默制造张力' : '正常',
        emphasis: intensity >= 7 ? '突出关键音效' : '背景层次'
    };
    
    // 🎥 导演
    const directorNotes = {
        intent: getDirectorIntent(emotion),
        pacing: intensity >= 7 ? '紧凑' : '舒缓',
        emphasis: emotion.layer === 'dramatic' ? '强调冲突' : (emotion.layer === 'emotional' ? '强调情绪' : '推进叙事'),
        note: getDirectorNote(emotion, style)
    };
    
    return {
        id: shotNum,
        shotId: `S01-${String(shotNum).padStart(3, '0')}`,
        time: emotion.time,
        durationSec: emotion.durationSec,
        layer: emotion.layer,
        layerName: shotLayers[emotion.layer].name,
        emotion: emotion.emotion,
        intensity: intensity,
        content: emotion.content,
        fullContent: emotion.fullContent,
        
        // 各智能体输出
        storyboard: { shotType, movement, composition, angle },
        art: artNotes,
        camera: cameraNotes,
        lighting: lightingNotes,
        colorist: colorNotes,
        acting: actingNotes,
        music: musicNotes,
        sound: soundNotes,
        director: directorNotes,
        
        // 最终Prompt
        imagePrompt: '',
        videoPrompt: ''
    };
}

// ===== 获取色温 =====
function getColorTemp(emotion, style) {
    const map = {
        '悲伤': '5000K偏冷',
        '喜悦': '4500K暖调',
        '愤怒': '4000K暖红',
        '恐惧': '6500K冷蓝',
        '爱意': '4200K暖粉',
        '平静': '5600K自然'
    };
    return map[emotion] || '5600K自然';
}

// ===== 获取LUT =====
function getLUT(emotion, style) {
    if (style.name === '王家卫') return 'Wong Kar-wai Neon';
    if (style.name === '侯孝贤') return 'Film Nostalgic';
    if (style.name === '诺兰') return 'Teal & Orange';
    
    const map = {
        '悲伤': 'Melancholy Blue',
        '喜悦': 'Sunny Warm',
        '恐惧': 'Horror Cold',
        '愤怒': 'Angry Red'
    };
    return map[emotion] || 'Natural Film';
}

// ===== 获取表情 =====
function getExpression(emotion, intensity) {
    const base = {
        '悲伤': '眉头微皱，眼含泪光',
        '喜悦': '嘴角上扬，眼睛发亮',
        '愤怒': '眉头紧锁，嘴唇紧抿',
        '恐惧': '瞳孔放大，面色苍白',
        '惊讶': '眼睛睁大，嘴巴微张',
        '爱意': '眼神温柔，面带微笑',
        '平静': '神态自然，放松'
    };
    let expr = base[emotion] || '自然表情';
    if (intensity >= 8) expr += '（强烈）';
    return expr;
}

// ===== 获取肢体语言 =====
function getBodyLanguage(emotion, intensity) {
    const map = {
        '悲伤': '肩膀下沉，动作缓慢',
        '喜悦': '步伐轻快，手势开放',
        '愤怒': '肌肉紧绷，动作有力',
        '恐惧': '身体蜷缩，后退',
        '惊讶': '身体后仰，手抬起',
        '爱意': '身体前倾，接近对方',
        '平静': '姿态放松，自然'
    };
    return map[emotion] || '自然状态';
}

// ===== 获取潜台词 =====
function getSubtext(emotion) {
    if (emotion.intensity >= 8) return '内心情绪爆发，外化表现';
    if (emotion.intensity >= 6) return '情绪涌动，略有压抑';
    return '日常状态，自然流露';
}

// ===== 获取环境音 =====
function getAmbience(emotion) {
    const map = {
        '悲伤': '雨声/风声',
        '喜悦': '鸟鸣/人声',
        '愤怒': '紧张环境音',
        '恐惧': '寂静/不安音效',
        '平静': '自然环境音'
    };
    return map[emotion.emotion] || '场景环境音';
}

// ===== 获取导演笔记 =====
function getDirectorNote(emotion, style) {
    if (emotion.layer === 'dramatic') return '这是关键戏，要让观众记住';
    if (emotion.layer === 'emotional') return '用镜头语言说话，少用对白';
    return '稳定推进，不抢戏';
}

// ===== 音乐智能体辅助函数 =====

// 获取主旋律乐器
function getMainInstruments(emotion, style) {
    const emotionMap = {
        '悲伤': '二胡独奏、大提琴',
        '喜悦': '竹笛、扬琴、小提琴',
        '愤怒': '定音鼓、铜管组、弦乐强奏',
        '恐惧': '低音提琴、不协和弦乐',
        '惊讶': '钢琴突强、弦乐pizz',
        '爱意': '钢琴、小提琴独奏',
        '震撼': '全乐队齐奏、打击乐',
        '平静': '古琴、箫',
        '期待': '弦乐渐强、木管',
        '紧张': '弦乐震音、定音鼓滚奏'
    };
    
    if (style.name === '王家卫') return emotionMap[emotion] || '萨克斯、电子合成';
    if (style.name === '宫崎骏') return emotionMap[emotion] || '钢琴、弦乐组、木管';
    
    return emotionMap[emotion] || '弦乐组';
}

// 获取副旋律乐器
function getSubInstruments(emotion, style) {
    const map = {
        '悲伤': '弦乐拨奏、竖琴',
        '喜悦': '木管和声、铃铛',
        '愤怒': '弦乐低音、军鼓',
        '恐惧': '钢片琴、颤音琴',
        '爱意': '竖琴琶音、木管',
        '平静': '古筝、风铃'
    };
    return map[emotion] || '弦乐和声';
}

// 获取主旋律动态
function getMainDynamics(emotion, shotNum) {
    const intensity = emotion.intensity;
    if (intensity >= 8) return '渐强至高潮 (cresc. → ff)';
    if (intensity >= 6) return '保持中强 (mf sostenuto)';
    if (intensity <= 3) return '渐弱至静默 (dim. → pp)';
    return '稳定 (mp)';
}

// 获取副旋律动态
function getSubDynamics(emotion, shotNum) {
    const intensity = emotion.intensity;
    if (intensity >= 7) return '跟随主旋律加强';
    if (intensity <= 3) return '独立轻柔衬托';
    return '和声支撑';
}

// 获取环境音类型
function getAmbientType(emotion) {
    const map = {
        '悲伤': '雨声、风声',
        '喜悦': '鸟鸣、人声嘈杂',
        '恐惧': '心跳、喘息',
        '愤怒': '雷声、玻璃碎裂',
        '平静': '自然白噪音、流水',
        '爱意': '轻风、远处笑声'
    };
    return map[emotion.emotion] || '场景环境音';
}

// 获取速度
function getTempo(intensity) {
    if (intensity >= 8) return 'Allegro vivace (快板)';
    if (intensity >= 6) return 'Moderato (中板)';
    if (intensity <= 3) return 'Adagio (慢板)';
    return 'Andante (行板)';
}

// 获取BPM
function getBPM(intensity) {
    if (intensity >= 8) return '120-140';
    if (intensity >= 6) return '90-110';
    if (intensity <= 3) return '50-70';
    return '70-90';
}

// 获取音乐过渡
function getMusicTransition(emotion, shotNum) {
    const intensity = emotion.intensity;
    const prevIntensity = shotNum > 1 ? (state.emotions[shotNum - 2]?.intensity || 5) : 5;
    
    if (intensity > prevIntensity + 2) return '🔺 渐强进入 (fade in cresc.)';
    if (intensity < prevIntensity - 2) return '🔻 渐弱过渡 (fade out dim.)';
    if (intensity >= 8 && prevIntensity < 6) return '⚡ 突强切入 (sforzando)';
    if (intensity <= 3 && prevIntensity >= 6) return '🔇 突然静默 (subito tacet)';
    return '➡️ 平滑衔接 (legato)';
}

// 生成音乐Prompt
function generateMusicPrompt(emotion, style, type) {
    const baseStyle = style.name !== '自动匹配' ? `${style.name}风格, ` : '';
    const era = state.config.era || '现代';
    
    if (type === 'main') {
        return `${baseStyle}${era}氛围, ${emotion.emotion}情绪, ${getMainInstruments(emotion.emotion, style)}, ${getTempo(emotion.intensity)}, ${emotion.intensity >= 7 ? '情感充沛' : '克制内敛'}`;
    } else if (type === 'sub') {
        return `和声衬托, ${getSubInstruments(emotion.emotion, style)}, 与主旋律形成对话, ${emotion.intensity >= 6 ? '丰富层次' : '简约支撑'}`;
    } else {
        return `环境音: ${getAmbientType(emotion)}, 自然融入画面, 不抢主旋律`;
    }
}

// ===== 获取乐器配置 =====
function getInstruments(emotion, style) {
    const map = {
        '悲伤': '二胡、大提琴',
        '喜悦': '笛子、扬琴',
        '愤怒': '鼓、铜管',
        '恐惧': '低音弦乐、不和谐音',
        '爱意': '钢琴、小提琴',
        '震撼': '全乐队齐奏',
        '平静': '古琴、留白'
    };
    return map[emotion] || '弦乐背景';
}

// ===== 获取导演意图 =====
function getDirectorIntent(emotion) {
    if (emotion.intensity >= 8) return '情绪高潮，让观众共情';
    if (emotion.intensity >= 6) return '推进剧情，保持张力';
    if (emotion.intensity <= 3) return '铺垫氛围，给观众喘息';
    return '稳定叙事，交代信息';
}

// ===== 渲染分镜（表格形式，可编辑） =====
function renderStoryboard() {
    const container = document.getElementById('storyboardGrid');
    
    container.innerHTML = `
        <div style="margin-bottom: 20px;">
            <strong>📊 分镜总表</strong> - 共 ${state.shots.length} 个镜头 × 12个智能体
            <br><small style="color: #888;">所有智能体输出汇总，可编辑后导出Excel</small>
        </div>
        
        <div style="max-height: 500px; overflow: auto;">
            <table class="output-table" id="storyboardTable">
                <thead>
                    <tr>
                        <th>镜号</th>
                        <th>时间</th>
                        <th>层级</th>
                        <th>内容</th>
                        <th>📐分镜师</th>
                        <th>🎨美术指导</th>
                        <th>📷摄影指导</th>
                        <th>💡灯光指导</th>
                        <th>🌈调色师</th>
                        <th>🎭表演指导</th>
                        <th>🎵配乐师</th>
                        <th>🔊音效师</th>
                        <th>🎥导演</th>
                    </tr>
                </thead>
                <tbody>
                    ${state.shots.map((shot, idx) => `
                        <tr class="shot-row ${shot.layer}">
                            <td><strong>${shot.shotId}</strong></td>
                            <td>${shot.time}<br><small>${shot.durationSec}秒</small></td>
                            <td>${shot.layerName}</td>
                            <td style="min-width: 120px;">
                                <input type="text" class="table-input" value="${shot.content}"
                                       onchange="updateShot(${idx}, 'content', this.value)">
                                <br><small class="emotion-tag">${shot.emotion} ${shot.intensity}</small>
                            </td>
                            <td style="min-width: 100px;">
                                <small>
                                    <strong>景别:</strong> ${shot.storyboard.shotType}<br>
                                    <strong>运镜:</strong> ${shot.storyboard.movement}<br>
                                    <strong>构图:</strong> ${shot.storyboard.composition}<br>
                                    <strong>角度:</strong> ${shot.storyboard.angle}
                                </small>
                            </td>
                            <td style="min-width: 100px;">
                                <small>
                                    <strong>服装:</strong> ${shot.art.costume}<br>
                                    <strong>道具:</strong> ${shot.art.props}<br>
                                    <strong>场景:</strong> ${shot.art.setDesign}<br>
                                    <strong>色板:</strong> ${shot.art.colorPalette}
                                </small>
                            </td>
                            <td style="min-width: 100px;">
                                <small>
                                    <strong>光圈:</strong> ${shot.camera.aperture}<br>
                                    <strong>焦段:</strong> ${shot.camera.focalLength}<br>
                                    <strong>景深:</strong> ${shot.camera.depthOfField}<br>
                                    <strong>胶片:</strong> ${shot.camera.filmStock}
                                </small>
                            </td>
                            <td style="min-width: 100px;">
                                <small>
                                    <strong>主光:</strong> ${shot.lighting.keyLight}<br>
                                    <strong>补光:</strong> ${shot.lighting.fillLight}<br>
                                    <strong>轮廓:</strong> ${shot.lighting.backLight}<br>
                                    <strong>比例:</strong> ${shot.lighting.lightingRatio}
                                </small>
                            </td>
                            <td style="min-width: 100px;">
                                <small>
                                    <strong>色温:</strong> ${shot.colorist.colorTemp}<br>
                                    <strong>饱和:</strong> ${shot.colorist.saturation}<br>
                                    <strong>对比:</strong> ${shot.colorist.contrast}<br>
                                    <strong>LUT:</strong> ${shot.colorist.lut}
                                </small>
                            </td>
                            <td style="min-width: 100px;">
                                <small>
                                    <strong>表情:</strong> ${shot.acting.expression}<br>
                                    <strong>肢体:</strong> ${shot.acting.bodyLanguage}<br>
                                    <strong>节奏:</strong> ${shot.acting.tempo}<br>
                                    <strong>潜台词:</strong> ${shot.acting.subtext}
                                </small>
                            </td>
                            <td style="min-width: 150px;">
                                <small>
                                    <strong>🎼主旋律:</strong> ${shot.music.mainMelody.active ? shot.music.mainMelody.instruments : '静默'}<br>
                                    <strong>动态:</strong> ${shot.music.mainMelody.dynamics}<br>
                                    <strong>🎵副旋律:</strong> ${shot.music.subMelody.instruments}<br>
                                    <strong>🌊环境:</strong> ${shot.music.ambientTrack.type}<br>
                                    <strong>BPM:</strong> ${shot.music.bpm} | <strong>调式:</strong> ${shot.music.key}<br>
                                    <strong>过渡:</strong> ${shot.music.transition}
                                </small>
                            </td>
                            <td style="min-width: 100px;">
                                <small>
                                    <strong>环境音:</strong> ${shot.sound.ambience}<br>
                                    <strong>拟音:</strong> ${shot.sound.foley}<br>
                                    <strong>音效:</strong> ${shot.sound.sfx}<br>
                                    <strong>重点:</strong> ${shot.sound.emphasis}
                                </small>
                            </td>
                            <td style="min-width: 100px;">
                                <small>
                                    <strong>意图:</strong> ${shot.director.intent}<br>
                                    <strong>节奏:</strong> ${shot.director.pacing}<br>
                                    <strong>重点:</strong> ${shot.director.emphasis}<br>
                                    <strong>笔记:</strong> ${shot.director.note}
                                </small>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// ===== 更新分镜数据 =====
function updateShot(idx, field, value) {
    state.shots[idx][field] = value;
}

// ===== 生成最终Prompt =====
function generateFinalPrompts() {
    setAgentStatus('composer', 'working');
    
    addChatMessage('agent', `
        <div class="agent-header">🔧 Prompt工程师</div>
        <p>汇总所有智能体输出，生成最终Prompt...</p>
    `);
    
    setTimeout(() => {
        const style = directorStyles[state.config.directorStyle] || directorStyles.auto;
        
        state.prompts.image = state.shots.map(shot => ({
            shotId: shot.shotId,
            prompt: `${shot.content}, ${state.config.era}, ${shot.storyboard.shotType} shot, ${shot.art.costume}, ${shot.lighting.keyLight}, ${shot.camera.aperture}, ${shot.art.color} color grading, ${shot.camera.filmStock}, ${style.name} style, cinematic --ar ${state.config.aspectRatio} --v 6`
        }));
        
        state.prompts.video = state.shots.map(shot => ({
            shotId: shot.shotId,
            prompt: `场景：${shot.content}\n景别：${shot.storyboard.shotType}\n运镜：${shot.storyboard.movement}\n时长：${shot.durationSec}秒\n光线：${shot.lighting.keyLight}\n风格：${style.name}`
        }));
        
        state.prompts.music = [{
            section: '配乐说明',
            prompt: state.shots.map(s => `${s.shotId}: ${s.music.mood} - ${s.music.instruments} (${s.music.dynamics})`).join('\n')
        }];
        
        setAgentStatus('composer', 'done');
        renderOutput();
    }, 2000);
}

// ===== 渲染输出 =====
function renderOutput() {
    switchTab('table');
}

// ===== 切换输出Tab =====
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.tab-btn[onclick="switchTab('${tab}')"]`)?.classList.add('active');
    
    const container = document.getElementById('outputContent');
    
    if (tab === 'table') {
        // 完整Excel风格表格
        container.innerHTML = `
            <div style="margin-bottom: 15px;">
                <strong>📊 完整分镜表（Excel格式）</strong> - ${state.shots.length} 个镜头
                <button class="btn-secondary" style="margin-left: 15px;" onclick="exportExcel()">📥 导出Excel (CSV)</button>
            </div>
            <div style="max-height: 500px; overflow: auto;">
                <table class="output-table" id="finalTable">
                    <thead>
                        <tr>
                            <th>镜号</th>
                            <th>时间</th>
                            <th>秒数</th>
                            <th>层级</th>
                            <th>情绪</th>
                            <th>强度</th>
                            <th>内容描述</th>
                            <th>景别</th>
                            <th>运镜</th>
                            <th>构图</th>
                            <th>光圈</th>
                            <th>焦段</th>
                            <th>主光</th>
                            <th>服装</th>
                            <th>色彩</th>
                            <th>配乐情绪</th>
                            <th>乐器</th>
                            <th>导演意图</th>
                            <th>图像Prompt</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.shots.map((shot, idx) => `
                            <tr>
                                <td>${shot.shotId}</td>
                                <td>${shot.time}</td>
                                <td>${shot.durationSec}</td>
                                <td>${shot.layerName}</td>
                                <td>${shot.emotion}</td>
                                <td>${shot.intensity}</td>
                                <td>${shot.content}</td>
                                <td>${shot.storyboard.shotType}</td>
                                <td>${shot.storyboard.movement}</td>
                                <td>${shot.storyboard.composition}</td>
                                <td>${shot.camera.aperture}</td>
                                <td>${shot.camera.focalLength}</td>
                                <td>${shot.lighting.keyLight}</td>
                                <td>${shot.art.costume}</td>
                                <td>${shot.art.color}</td>
                                <td>${shot.music.mood}</td>
                                <td>${shot.music.instruments}</td>
                                <td>${shot.director.intent}</td>
                                <td style="max-width: 200px; overflow: hidden; text-overflow: ellipsis;">${state.prompts.image[idx]?.prompt.substring(0, 50)}...</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } else if (tab === 'image') {
        container.innerHTML = `<div style="max-height: 500px; overflow: auto;">` +
            state.prompts.image.map(p => `
                <div class="prompt-box">
                    <h4>🖼️ ${p.shotId}</h4>
                    <pre>${p.prompt}</pre>
                </div>
            `).join('') + '</div>';
    } else if (tab === 'video') {
        container.innerHTML = `<div style="max-height: 500px; overflow: auto;">` +
            state.prompts.video.map(p => `
                <div class="prompt-box">
                    <h4>🎬 ${p.shotId}</h4>
                    <pre>${p.prompt}</pre>
                </div>
            `).join('') + '</div>';
    } else if (tab === 'music') {
        // 完整音乐轨道视图
        container.innerHTML = `
            <div style="margin-bottom: 20px;">
                <strong>🎵 音乐轨道时间线</strong>
                <br><small style="color: #888;">主旋律 / 副旋律 / 环境音 三轨并行</small>
            </div>
            
            <!-- 音乐轨道可视化 -->
            <div style="background: rgba(0,0,0,0.3); border-radius: 10px; padding: 15px; margin-bottom: 20px;">
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <span style="width: 80px; color: #f5576c;">🎼 主旋律</span>
                    <div style="flex: 1; height: 30px; display: flex; gap: 1px;">
                        ${state.shots.map(s => `
                            <div style="flex: ${s.durationSec}; height: 100%; 
                                        background: ${s.music.mainMelody.active ? 
                                            (s.intensity >= 7 ? '#f5576c' : 'rgba(245,87,108,0.5)') : 
                                            'rgba(255,255,255,0.1)'};
                                        border-radius: 2px;"
                                 title="${s.shotId}: ${s.music.mainMelody.instruments}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <span style="width: 80px; color: #4facfe;">🎵 副旋律</span>
                    <div style="flex: 1; height: 30px; display: flex; gap: 1px;">
                        ${state.shots.map(s => `
                            <div style="flex: ${s.durationSec}; height: 100%; 
                                        background: ${s.music.subMelody.active ? 
                                            (s.intensity >= 6 ? '#4facfe' : 'rgba(79,172,254,0.5)') : 
                                            'rgba(255,255,255,0.1)'};
                                        border-radius: 2px;"
                                 title="${s.shotId}: ${s.music.subMelody.instruments}">
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <span style="width: 80px; color: #6bcb77;">🌊 环境音</span>
                    <div style="flex: 1; height: 30px; display: flex; gap: 1px;">
                        ${state.shots.map(s => `
                            <div style="flex: ${s.durationSec}; height: 100%; 
                                        background: rgba(107,203,119,0.5);
                                        border-radius: 2px;"
                                 title="${s.shotId}: ${s.music.ambientTrack.type}">
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <!-- 音乐详情表格 -->
            <div style="max-height: 400px; overflow: auto;">
                <table class="output-table">
                    <thead>
                        <tr>
                            <th>镜号</th>
                            <th>时间</th>
                            <th>过渡</th>
                            <th>🎼 主旋律</th>
                            <th>主旋律Prompt</th>
                            <th>🎵 副旋律</th>
                            <th>🌊 环境音</th>
                            <th>BPM</th>
                            <th>调式</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${state.shots.map(shot => `
                            <tr>
                                <td><strong>${shot.shotId}</strong></td>
                                <td>${shot.time}</td>
                                <td>${shot.music.transition}</td>
                                <td>
                                    <small>
                                        <strong>乐器:</strong> ${shot.music.mainMelody.instruments}<br>
                                        <strong>音量:</strong> ${shot.music.mainMelody.volume}<br>
                                        <strong>动态:</strong> ${shot.music.mainMelody.dynamics}
                                    </small>
                                </td>
                                <td style="max-width: 200px;">
                                    <small style="color: #4facfe;">${shot.music.mainMelody.prompt}</small>
                                </td>
                                <td>
                                    <small>
                                        ${shot.music.subMelody.instruments}<br>
                                        ${shot.music.subMelody.dynamics}
                                    </small>
                                </td>
                                <td>
                                    <small>${shot.music.ambientTrack.type}</small>
                                </td>
                                <td>${shot.music.bpm}</td>
                                <td>${shot.music.key}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }
}

// ===== 导出Excel (CSV格式) =====
function exportExcel() {
    const headers = [
        '镜号', '时间', '秒数', '层级', '情绪', '强度', '内容描述',
        // 分镜师
        '景别', '运镜', '构图', '角度',
        // 美术
        '服装', '道具', '场景设计', '色板',
        // 摄影
        '光圈', '焦段', '景深', '胶片',
        // 灯光
        '主光', '补光', '轮廓光', '灯光比例',
        // 调色
        '色温', '饱和度', '对比度', 'LUT',
        // 表演
        '表情', '肢体语言', '表演节奏', '潜台词',
        // 配乐 - 主旋律
        '主旋律乐器', '主旋律音量', '主旋律动态', '主旋律Prompt',
        // 配乐 - 副旋律  
        '副旋律乐器', '副旋律音量', '副旋律动态', '副旋律Prompt',
        // 配乐 - 环境音
        '环境音类型', '环境音Prompt',
        // 配乐 - 整体
        '速度', 'BPM', '调式', '音乐过渡',
        // 音效
        '环境音', '拟音', '音效', '音效重点',
        // 导演
        '导演意图', '节奏', '重点', '导演笔记',
        // Prompt
        '图像Prompt'
    ];
    
    const rows = state.shots.map((shot, idx) => [
        shot.shotId,
        shot.time,
        shot.durationSec,
        shot.layerName,
        shot.emotion,
        shot.intensity,
        shot.content,
        // 分镜师
        shot.storyboard.shotType,
        shot.storyboard.movement,
        shot.storyboard.composition,
        shot.storyboard.angle,
        // 美术
        shot.art.costume,
        shot.art.props,
        shot.art.setDesign,
        shot.art.colorPalette,
        // 摄影
        shot.camera.aperture,
        shot.camera.focalLength,
        shot.camera.depthOfField,
        shot.camera.filmStock,
        // 灯光
        shot.lighting.keyLight,
        shot.lighting.fillLight,
        shot.lighting.backLight,
        shot.lighting.lightingRatio,
        // 调色
        shot.colorist.colorTemp,
        shot.colorist.saturation,
        shot.colorist.contrast,
        shot.colorist.lut,
        // 表演
        shot.acting.expression,
        shot.acting.bodyLanguage,
        shot.acting.tempo,
        shot.acting.subtext,
        // 配乐 - 主旋律
        shot.music.mainMelody.instruments,
        shot.music.mainMelody.volume,
        shot.music.mainMelody.dynamics,
        shot.music.mainMelody.prompt,
        // 配乐 - 副旋律
        shot.music.subMelody.instruments,
        shot.music.subMelody.volume,
        shot.music.subMelody.dynamics,
        shot.music.subMelody.prompt,
        // 配乐 - 环境音
        shot.music.ambientTrack.type,
        shot.music.ambientTrack.prompt,
        // 配乐 - 整体
        shot.music.tempo,
        shot.music.bpm,
        shot.music.key,
        shot.music.transition,
        // 音效
        shot.sound.ambience,
        shot.sound.foley,
        shot.sound.sfx,
        shot.sound.emphasis,
        // 导演
        shot.director.intent,
        shot.director.pacing,
        shot.director.emphasis,
        shot.director.note,
        // Prompt
        state.prompts.image[idx]?.prompt || ''
    ]);
    
    // 转换为CSV
    const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n');
    
    // 添加BOM以支持中文
    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `分镜表_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    
    addChatMessage('system', '✅ Excel (CSV) 已导出！用Excel或Numbers打开即可');
}

// ===== 生成人物设定和时代考据 =====
function generateCharacterAndEra() {
    setAgentStatus('eraConsultant', 'working');
    setAgentStatus('costumeDesigner', 'working');
    
    addChatMessage('agent', `
        <div class="agent-header">📜 时代顾问 + 👗 服化道设计师</div>
        <p>正在分析故事中的人物和时代背景...</p>
    `);
    
    setTimeout(() => {
        // 分析人物
        state.characters = extractCharacters(state.story);
        
        // 分析时代背景
        state.eraDetails = analyzeEra(state.config.era, state.story);
        
        setAgentStatus('eraConsultant', 'done');
        setAgentStatus('costumeDesigner', 'done');
        
        renderCharacterAndEra();
    }, 2000);
}

// ===== 提取人物 =====
function extractCharacters(story) {
    // 简单的人物提取逻辑（实际应用中可以用AI）
    const characters = [];
    
    // 常见人物指代词
    const pronouns = ['他', '她', '我', '你'];
    const namePattern = /[「『"]([\u4e00-\u9fa5]{2,4})[」』"]/g;
    
    // 尝试提取对话中的名字
    let match;
    const names = new Set();
    while ((match = namePattern.exec(story)) !== null) {
        if (match[1].length >= 2 && match[1].length <= 4) {
            names.add(match[1]);
        }
    }
    
    // 为每个提取的名字创建人物小传
    let id = 1;
    names.forEach(name => {
        characters.push(generateCharacterProfile(name, id++, state.config.era));
    });
    
    // 如果没提取到，创建默认主角
    if (characters.length === 0) {
        characters.push(generateCharacterProfile('主角', 1, state.config.era));
        characters.push(generateCharacterProfile('配角', 2, state.config.era));
    }
    
    return characters.slice(0, 5); // 最多5个主要人物
}

// ===== 生成人物小传 =====
function generateCharacterProfile(name, id, era) {
    const ageRange = ['青年', '中年', '老年', '少年'];
    const gender = Math.random() > 0.5 ? '男' : '女';
    const age = ageRange[Math.floor(Math.random() * ageRange.length)];
    
    return {
        id: id,
        name: name,
        gender: gender,
        ageGroup: age,
        
        // 外貌特征
        appearance: {
            face: gender === '男' ? '方脸，剑眉' : '瓜子脸，柳眉',
            height: gender === '男' ? '中等偏高' : '中等',
            build: age === '青年' ? '健壮/纤细' : '普通',
            distinctive: '无明显特征', // 可编辑
            skinTone: '黄皮肤',
            hair: getHairStyle(era, gender)
        },
        
        // 服装设定
        costume: {
            daily: getDailyCostume(era, gender, age),
            formal: getFormalCostume(era, gender),
            colors: getCharacterColors(id),
            accessories: getAccessories(era, gender),
            condition: '整洁/破旧' // 可编辑
        },
        
        // 人物性格（影响表演）
        personality: {
            traits: ['坚韧', '善良'][Math.floor(Math.random() * 2)],
            speaking: '语速适中',
            movement: '动作干练'
        },
        
        // 人物小传
        bio: `${name}，${age}${gender === '男' ? '男子' : '女子'}，生活在${era}。`,
        
        // 参考图（placeholder）
        referencePrompt: `${era} ${gender === '男' ? 'Chinese man' : 'Chinese woman'}, ${age}, ${getHairStyle(era, gender)}, wearing ${getDailyCostume(era, gender, age)}, portrait, realistic`
    };
}

// ===== 获取发型 =====
function getHairStyle(era, gender) {
    if (era.includes('民国') || era.includes('1920') || era.includes('1930')) {
        return gender === '男' ? '短发/平头' : '齐耳短发/盘发';
    }
    if (era.includes('清') || era.includes('1800')) {
        return gender === '男' ? '辫子' : '旗头/盘发';
    }
    if (era.includes('唐') || era.includes('宋') || era.includes('明')) {
        return gender === '男' ? '束发戴冠' : '高髻/云鬓';
    }
    return gender === '男' ? '现代短发' : '现代长发/短发';
}

// ===== 获取日常服装 =====
function getDailyCostume(era, gender, age) {
    if (era.includes('民国') || era.includes('1920') || era.includes('1930')) {
        return gender === '男' ? '对襟短褂、布裤、布鞋' : '旗袍/蓝布衫裤';
    }
    if (era.includes('清')) {
        return gender === '男' ? '长衫马褂' : '旗装';
    }
    if (era.includes('唐')) {
        return gender === '男' ? '圆领袍' : '襦裙';
    }
    return gender === '男' ? '现代便装' : '现代便装';
}

// ===== 获取正装 =====
function getFormalCostume(era, gender) {
    if (era.includes('民国')) {
        return gender === '男' ? '长衫/西装' : '考究旗袍';
    }
    if (era.includes('清')) {
        return gender === '男' ? '官服/礼服' : '吉服';
    }
    return gender === '男' ? '正装' : '礼服';
}

// ===== 获取人物配色 =====
function getCharacterColors(id) {
    const palettes = [
        ['藏青', '灰白', '黑'],
        ['深蓝', '米白', '褐'],
        ['墨绿', '象牙', '棕'],
        ['酒红', '金', '黑'],
        ['靛蓝', '白', '灰']
    ];
    return palettes[(id - 1) % palettes.length];
}

// ===== 获取配饰 =====
function getAccessories(era, gender) {
    if (era.includes('民国')) {
        return gender === '男' ? '怀表、布帽' : '耳环、手镯';
    }
    return gender === '男' ? '腰带、帽子' : '首饰、发饰';
}

// ===== 分析时代背景 =====
function analyzeEra(era, story) {
    const details = {
        period: era || '现代',
        location: extractLocation(story) || '中国',
        
        // 文化细节
        culture: getCultureDetails(era),
        
        // 服饰规范
        clothing: getClothingRules(era),
        
        // 建筑风格
        architecture: getArchitecture(era),
        
        // 常见道具
        props: getEraProps(era),
        
        // 禁忌/注意事项
        taboos: getTaboos(era),
        
        // 参考资料
        references: getReferences(era)
    };
    
    return details;
}

// ===== 提取地点 =====
function extractLocation(story) {
    const locations = ['北京', '北平', '上海', '广州', '南京', '成都', '西安', '杭州'];
    for (const loc of locations) {
        if (story.includes(loc)) return loc;
    }
    return '未指定';
}

// ===== 获取文化细节 =====
function getCultureDetails(era) {
    if (era.includes('民国') || era.includes('1920') || era.includes('1930')) {
        return [
            '新旧文化交替，有西化影响',
            '等级观念仍存，但开始松动',
            '报纸、电影开始流行',
            '五四运动后思想解放'
        ];
    }
    if (era.includes('清')) {
        return [
            '严格等级制度',
            '满汉文化并存',
            '礼教规范严格',
            '科举制度'
        ];
    }
    return ['现代都市文化', '多元化生活方式'];
}

// ===== 获取服饰规范 =====
function getClothingRules(era) {
    if (era.includes('民国')) {
        return [
            '男性：长衫、西装、中山装并存',
            '女性：旗袍流行，也有传统服饰',
            '劳动者：粗布短褂、布裤',
            '颜色：蓝、灰、黑为主，富人有彩色'
        ];
    }
    if (era.includes('清')) {
        return [
            '满族：旗装、长袍马褂',
            '汉族：长衫、对襟',
            '颜色有等级规定',
            '不可僭越穿着'
        ];
    }
    return ['现代服饰自由', '根据场合选择'];
}

// ===== 获取建筑风格 =====
function getArchitecture(era) {
    if (era.includes('民国') || era.includes('北京') || era.includes('北平')) {
        return [
            '四合院、胡同',
            '洋楼、租界建筑',
            '城墙、城门',
            '店铺：木结构、挂匾'
        ];
    }
    if (era.includes('上海')) {
        return [
            '石库门',
            '外滩洋房',
            '弄堂',
            '租界建筑'
        ];
    }
    return ['现代建筑', '高楼大厦'];
}

// ===== 获取时代道具 =====
function getEraProps(era) {
    if (era.includes('民国') || era.includes('1920')) {
        return [
            '人力车/黄包车',
            '煤油灯、蜡烛',
            '算盘、账本',
            '铜钱、银元',
            '烟袋、茶壶',
            '报纸、书信',
            '留声机（富人）'
        ];
    }
    if (era.includes('清')) {
        return [
            '轿子、马车',
            '烟袋、鼻烟壶',
            '笔墨纸砚',
            '灯笼、蜡烛'
        ];
    }
    return ['现代电子产品', '汽车', '手机'];
}

// ===== 获取禁忌 =====
function getTaboos(era) {
    if (era.includes('民国') || era.includes('清')) {
        return [
            '⚠️ 注意：不要出现现代物品（塑料、电器）',
            '⚠️ 注意：服饰颜色要符合身份',
            '⚠️ 注意：发型要符合时代',
            '⚠️ 注意：语言用词要符合时代'
        ];
    }
    return ['注意时代一致性'];
}

// ===== 获取参考资料 =====
function getReferences(era) {
    if (era.includes('民国') || era.includes('1920') || era.includes('1930')) {
        return [
            '电影参考：《霸王别姬》《活着》《色戒》',
            '美术参考：老北京照片、民国画报',
            '建筑参考：故宫、老北京胡同',
            '服饰参考：民国旗袍、长衫照片'
        ];
    }
    return ['根据具体时代查找参考'];
}

// ===== 渲染人物和时代设定 =====
function renderCharacterAndEra() {
    const container = document.getElementById('characterOutput');
    
    container.innerHTML = `
        <!-- 时代顾问输出 -->
        <div class="section-card era-section">
            <h3>📜 时代顾问报告</h3>
            <div class="era-grid">
                <div class="era-item">
                    <label>时代</label>
                    <input type="text" class="editable-input full" value="${state.eraDetails.period}"
                           onchange="updateEra('period', this.value)">
                </div>
                <div class="era-item">
                    <label>地点</label>
                    <input type="text" class="editable-input full" value="${state.eraDetails.location}"
                           onchange="updateEra('location', this.value)">
                </div>
            </div>
            
            <div class="era-details">
                <div class="detail-box">
                    <h4>🎭 文化背景</h4>
                    <ul>${state.eraDetails.culture.map(c => `<li>${c}</li>`).join('')}</ul>
                </div>
                <div class="detail-box">
                    <h4>👔 服饰规范</h4>
                    <ul>${state.eraDetails.clothing.map(c => `<li>${c}</li>`).join('')}</ul>
                </div>
                <div class="detail-box">
                    <h4>🏛️ 建筑风格</h4>
                    <ul>${state.eraDetails.architecture.map(c => `<li>${c}</li>`).join('')}</ul>
                </div>
                <div class="detail-box">
                    <h4>🔧 时代道具</h4>
                    <ul>${state.eraDetails.props.map(c => `<li>${c}</li>`).join('')}</ul>
                </div>
            </div>
            
            <div class="taboos-box">
                <h4>⚠️ 考据注意事项</h4>
                <ul>${state.eraDetails.taboos.map(t => `<li>${t}</li>`).join('')}</ul>
            </div>
            
            <div class="reference-box">
                <h4>📚 参考资料</h4>
                <ul>${state.eraDetails.references.map(r => `<li>${r}</li>`).join('')}</ul>
            </div>
        </div>
        
        <!-- 服化道设计师输出 -->
        <div class="section-card character-section">
            <h3>👗 人物设定（服化道设计师）</h3>
            <p style="color: #888; margin-bottom: 15px;">共识别 ${state.characters.length} 个主要人物，点击可编辑</p>
            
            <div class="character-grid">
                ${state.characters.map((char, idx) => `
                    <div class="character-card">
                        <div class="char-header">
                            <input type="text" class="char-name" value="${char.name}"
                                   onchange="updateCharacter(${idx}, 'name', this.value)">
                            <span class="char-badge">${char.gender} · ${char.ageGroup}</span>
                        </div>
                        
                        <div class="char-section">
                            <h5>👤 外貌特征</h5>
                            <div class="char-detail">
                                <span>脸型：</span>
                                <input type="text" value="${char.appearance.face}"
                                       onchange="updateCharacter(${idx}, 'appearance.face', this.value)">
                            </div>
                            <div class="char-detail">
                                <span>发型：</span>
                                <input type="text" value="${char.appearance.hair}"
                                       onchange="updateCharacter(${idx}, 'appearance.hair', this.value)">
                            </div>
                            <div class="char-detail">
                                <span>身材：</span>
                                <input type="text" value="${char.appearance.build}"
                                       onchange="updateCharacter(${idx}, 'appearance.build', this.value)">
                            </div>
                            <div class="char-detail">
                                <span>特征：</span>
                                <input type="text" value="${char.appearance.distinctive}"
                                       onchange="updateCharacter(${idx}, 'appearance.distinctive', this.value)">
                            </div>
                        </div>
                        
                        <div class="char-section">
                            <h5>👗 服装设定</h5>
                            <div class="char-detail">
                                <span>日常：</span>
                                <input type="text" value="${char.costume.daily}"
                                       onchange="updateCharacter(${idx}, 'costume.daily', this.value)">
                            </div>
                            <div class="char-detail">
                                <span>正装：</span>
                                <input type="text" value="${char.costume.formal}"
                                       onchange="updateCharacter(${idx}, 'costume.formal', this.value)">
                            </div>
                            <div class="char-detail">
                                <span>配色：</span>
                                <span class="color-tags">${char.costume.colors.map(c => `<span class="color-tag">${c}</span>`).join('')}</span>
                            </div>
                            <div class="char-detail">
                                <span>配饰：</span>
                                <input type="text" value="${char.costume.accessories}"
                                       onchange="updateCharacter(${idx}, 'costume.accessories', this.value)">
                            </div>
                        </div>
                        
                        <div class="char-section">
                            <h5>📝 人物小传</h5>
                            <textarea class="char-bio" onchange="updateCharacter(${idx}, 'bio', this.value)">${char.bio}</textarea>
                        </div>
                        
                        <div class="char-section">
                            <h5>🖼️ 参考图Prompt</h5>
                            <div class="prompt-preview">${char.referencePrompt}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <button class="btn-secondary" onclick="addCharacter()" style="margin-top: 15px;">
                ➕ 添加人物
            </button>
        </div>
    `;
}

// ===== 更新人物数据 =====
function updateCharacter(idx, field, value) {
    const fields = field.split('.');
    if (fields.length === 2) {
        state.characters[idx][fields[0]][fields[1]] = value;
    } else {
        state.characters[idx][field] = value;
    }
}

// ===== 更新时代数据 =====
function updateEra(field, value) {
    state.eraDetails[field] = value;
}

// ===== 添加人物 =====
function addCharacter() {
    const newChar = generateCharacterProfile('新人物', state.characters.length + 1, state.config.era);
    state.characters.push(newChar);
    renderCharacterAndEra();
    addChatMessage('system', '✅ 已添加新人物，请编辑详细信息');
}

// ===== 确认步骤 =====
function confirmStep(step) {
    if (step === 'chapter') {
        markStepComplete('chapter');
        goToStep('character');
        generateCharacterAndEra();
    } else if (step === 'character') {
        markStepComplete('character');
        goToStep('emotion');
        generateEmotions();
    } else if (step === 'emotion') {
        markStepComplete('emotion');
        goToStep('storyboard');
        generateStoryboard();
    } else if (step === 'storyboard') {
        markStepComplete('storyboard');
        goToStep('output');
        generateFinalPrompts();
    }
}

// ===== 返回上一步 =====
function goBack() {
    const currentIndex = stepOrder.indexOf(state.currentStep);
    if (currentIndex > 0) {
        const prevStep = stepOrder[currentIndex - 1];
        goToStep(prevStep);
        addChatMessage('system', `返回到: ${getStepName(prevStep)}`);
    }
}

// ===== 获取步骤名称 =====
function getStepName(step) {
    const names = {
        'input': '输入故事',
        'chapter': '章节规划',
        'character': '人物/时代设定',
        'emotion': '情绪设计',
        'storyboard': '分镜设计',
        'output': '生成输出'
    };
    return names[step] || step;
}

// ===== 重新生成 =====
function regenerate(step) {
    addChatMessage('system', `正在重新生成 ${getStepName(step)}...`);
    
    if (step === 'chapter') generateChapters();
    else if (step === 'character') generateCharacterAndEra();
    else if (step === 'emotion') generateEmotions();
    else if (step === 'storyboard') generateStoryboard();
}

// ===== 导出全部 =====
function exportAll() {
    const data = {
        story: state.story,
        config: state.config,
        chapters: state.chapters,
        emotions: state.emotions,
        shots: state.shots,
        prompts: state.prompts
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ai_drama_project.json';
    a.click();
    URL.revokeObjectURL(url);
    
    addChatMessage('system', '✅ 项目JSON已导出！');
}

// ===== 复制Prompt =====
function copyPrompts() {
    const allPrompts = state.prompts.image.map(p => `${p.shotId}:\n${p.prompt}`).join('\n\n');
    navigator.clipboard.writeText(allPrompts).then(() => {
        addChatMessage('system', '✅ 所有Prompt已复制到剪贴板！');
    });
}

// ===== 辅助函数 =====
function goToStep(step) {
    state.currentStep = step;
    document.querySelectorAll('.step-panel').forEach(panel => panel.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    document.querySelector(`.nav-item[data-step="${step}"]`).classList.add('active');
}

function markStepComplete(step) {
    document.querySelector(`.nav-item[data-step="${step}"]`).classList.add('completed');
}

function setAgentStatus(agent, status) {
    if (agents[agent]) {
        agents[agent].status = status;
        updateAgentStatus();
    }
}

function updateAgentStatus() {
    const container = document.getElementById('agentStatus');
    container.innerHTML = Object.entries(agents).map(([key, agent]) => `
        <div class="agent-item">
            <span>${agent.icon} ${agent.name}</span>
            <span class="status ${agent.status}">${
                agent.status === 'waiting' ? '待命' :
                agent.status === 'working' ? '工作中...' : '✓ 完成'
            }</span>
        </div>
    `).join('');
}

function addChatMessage(type, content) {
    const container = document.getElementById('chatContainer');
    const message = document.createElement('div');
    message.className = `chat-message ${type}`;
    message.innerHTML = `<div class="message-content">${content}</div>`;
    container.appendChild(message);
    container.scrollTop = container.scrollHeight;
}

function getIntensityClass(intensity) {
    if (intensity >= 7) return 'intensity-high';
    if (intensity >= 4) return 'intensity-mid';
    return 'intensity-low';
}
