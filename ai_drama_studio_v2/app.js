// ===== 全局状态 =====
const state = {
    story: '',
    config: { directorStyle: 'auto', era: '', duration: 8, aspectRatio: '16:9' },
    
    // 全局章节
    chapters: [],
    
    // 当前制作的集
    currentEpisode: null,
    
    // 每集的详细数据
    episodes: {},  // { 1: { emotions, characters, shots, music, completed }, ... }
    
    // 时代考据（全局共享）
    eraDetails: null
};

// ===== 部门定义 =====
const departments = {
    executive: { name: '总导演', icon: '🎬', color: '#ffd93d', status: 'waiting' },
    writer: { name: '编剧部', icon: '📝', color: '#4facfe', status: 'waiting', 
              includes: ['剧本', '对白', '情绪设计'] },
    art: { name: '美术部', icon: '🎨', color: '#f093fb', status: 'waiting',
           includes: ['服装', '化妆', '道具', '场景'] },
    director: { name: '导演部', icon: '🎥', color: '#f5576c', status: 'waiting',
                includes: ['分镜', '摄影', '灯光', '调色', '表演指导'] },
    music: { name: '音乐部', icon: '🎵', color: '#6bcb77', status: 'waiting',
             includes: ['主旋律', '副旋律', '环境音', '音效'] },
    research: { name: '考据部', icon: '📜', color: '#00f2fe', status: 'waiting',
                includes: ['历史顾问', '文化考据'] }
};

// ===== 导演风格 =====
const directorStyles = {
    auto: { name: '自动', color: '自然色调' },
    hou: { name: '侯孝贤', color: '低饱和暖黄' },
    wong: { name: '王家卫', color: '霓虹高饱和' },
    jiang: { name: '姜文', color: '饱满明亮' },
    ang: { name: '李安', color: '细腻自然' },
    ghibli: { name: '宫崎骏', color: '温暖明亮' }
};

// ===== 初始化 =====
document.addEventListener('DOMContentLoaded', () => {
    updateDeptStatus();
    
    // 检查是否有从IP库导入的内容
    checkImportedStory();
});

// ===== 检查导入内容 =====
function checkImportedStory() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('import') === 'true') {
        const importedData = localStorage.getItem('importedStory');
        if (importedData) {
            try {
                const data = JSON.parse(importedData);
                // 填充到输入框
                const storyInput = document.getElementById('storyInput');
                if (storyInput) {
                    storyInput.value = data.text;
                    updateCharCount();
                    
                    // 显示导入成功提示
                    showImportNotification(data.name, data.type);
                    
                    // 清除localStorage中的数据
                    localStorage.removeItem('importedStory');
                    
                    // 清除URL参数
                    window.history.replaceState({}, document.title, window.location.pathname);
                }
            } catch (e) {
                console.error('导入数据解析失败:', e);
            }
        }
    }
}

// ===== 显示导入成功提示 =====
function showImportNotification(name, type) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(90deg, #ffd93d, #f5576c);
        color: #000;
        padding: 15px 30px;
        border-radius: 30px;
        font-weight: 600;
        z-index: 9999;
        animation: slideDown 0.5s ease;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    notification.innerHTML = `
        ✅ 已成功导入「${name}」${type === 'literature' ? '原文' : '故事大纲'}！
    `;
    document.body.appendChild(notification);
    
    // 3秒后消失
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.5s ease';
        setTimeout(() => notification.remove(), 500);
    }, 3000);
}

// ===== 更新字数统计 =====
function updateCharCount() {
    const text = document.getElementById('storyInput').value;
    document.getElementById('charCount').textContent = text.length + ' 字';
}

// ===== 开始分析 =====
function startAnalysis() {
    const story = document.getElementById('storyInput').value.trim();
    if (!story || story.length < 100) {
        alert('请输入至少100字的故事内容');
        return;
    }
    
    state.story = story;
    state.config = {
        directorStyle: document.getElementById('directorStyle').value,
        era: document.getElementById('eraInput').value || '现代',
        duration: parseInt(document.getElementById('duration').value),
        aspectRatio: document.getElementById('aspectRatio').value
    };
    
    // 更新统计
    document.getElementById('statChars').textContent = story.length + ' 字';
    
    setDeptStatus('executive', 'working');
    
    setTimeout(() => {
        analyzeAndDivideChapters();
        setDeptStatus('executive', 'done');
        setDeptStatus('research', 'working');
        
        // 生成时代考据
        state.eraDetails = generateEraDetails(state.config.era, story);
        setDeptStatus('research', 'done');
        
        goToStep('chapters');
    }, 1500);
}

// ===== 分析并划分章节 =====
function analyzeAndDivideChapters() {
    const story = state.story;
    const duration = state.config.duration;
    const charsPerMinute = 500;
    
    // 按段落分割
    const paragraphs = story.split(/\n\n+/).filter(p => p.trim().length > 0);
    const totalChars = story.length;
    const totalMinutes = Math.ceil(totalChars / charsPerMinute);
    const numChapters = Math.max(1, Math.ceil(totalMinutes / duration));
    
    const chapters = [];
    const parasPerChapter = Math.ceil(paragraphs.length / numChapters);
    
    for (let i = 0; i < numChapters; i++) {
        const startPara = i * parasPerChapter;
        const endPara = Math.min(startPara + parasPerChapter, paragraphs.length);
        const chapterParas = paragraphs.slice(startPara, endPara);
        const chapterText = chapterParas.join('\n\n');
        
        chapters.push({
            id: i + 1,
            title: `第${i + 1}集`,
            duration: Math.min(duration, Math.ceil(chapterText.length / charsPerMinute)),
            charCount: chapterText.length,
            highlight: extractHighlight(chapterText),
            text: chapterText,
            completed: false
        });
        
        // 初始化每集数据
        state.episodes[i + 1] = {
            emotions: [],
            characters: [],
            shots: [],
            music: [],
            completed: false
        };
    }
    
    state.chapters = chapters;
    document.getElementById('statEpisodes').textContent = chapters.length + ' 集';
    
    renderChaptersOverview();
    updateEpisodeProgress();
}

// ===== 提取看点 =====
function extractHighlight(text) {
    const sentences = text.split(/[。！？]/);
    for (const s of sentences) {
        if (s.trim().length > 10 && s.trim().length < 40) {
            return s.trim();
        }
    }
    return text.substring(0, 30) + '...';
}

// ===== 渲染章节概览 =====
function renderChaptersOverview() {
    const container = document.getElementById('chaptersOverview');
    
    container.innerHTML = `
        <div style="margin-bottom: 20px; padding: 15px; background: rgba(255,217,61,0.1); border: 1px solid var(--dept-executive); border-radius: 10px;">
            <strong>🎬 总导演报告</strong>
            <p style="margin-top: 8px; color: var(--text-secondary);">
                故事共 <strong>${state.story.length}</strong> 字，建议分为 <strong>${state.chapters.length}</strong> 集。
                点击某一集开始详细制作。
            </p>
        </div>
        
        <div class="chapters-grid">
            ${state.chapters.map(ch => `
                <div class="chapter-card ${ch.completed ? 'completed' : ''} ${state.currentEpisode === ch.id ? 'current' : ''}"
                     onclick="selectEpisode(${ch.id})">
                    <div class="chapter-num">第 ${ch.id} 集</div>
                    <div class="chapter-title">
                        <input type="text" class="editable" value="${ch.title}" 
                               onclick="event.stopPropagation()"
                               onchange="updateChapterTitle(${ch.id}, this.value)">
                    </div>
                    <div class="chapter-meta">
                        ⏱️ ${ch.duration}分钟 · 📝 ${ch.charCount}字
                    </div>
                    <div class="chapter-highlight">
                        ✨ ${ch.highlight}
                    </div>
                    <div class="chapter-status ${ch.completed ? 'done' : 'ready'}">
                        ${ch.completed ? '✅ 已完成' : '🎬 点击开始制作'}
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// ===== 更新章节标题 =====
function updateChapterTitle(id, title) {
    const ch = state.chapters.find(c => c.id === id);
    if (ch) ch.title = title;
}

// ===== 选择某集开始制作 =====
function selectEpisode(id) {
    state.currentEpisode = id;
    document.getElementById('currentEpisode').textContent = `第${id}集`;
    document.getElementById('statCurrent').textContent = `第${id}集`;
    document.getElementById('episodeNav').style.display = 'block';
    
    // 开始编剧部工作
    startWriterDept();
}

// ===== 编剧部 =====
function startWriterDept() {
    const ep = state.currentEpisode;
    document.getElementById('writerTitle').textContent = `📝 编剧部 - 第${ep}集`;
    
    setDeptStatus('writer', 'working');
    goToStep('writer');
    
    setTimeout(() => {
        generateEmotions(ep);
        setDeptStatus('writer', 'done');
        renderWriterOutput();
    }, 1500);
}

// ===== 生成情绪节拍 =====
function generateEmotions(episodeId) {
    const chapter = state.chapters.find(c => c.id === episodeId);
    if (!chapter) return;
    
    const text = chapter.text;
    const durationSec = chapter.duration * 60;
    const avgShot = 6;
    const numShots = Math.ceil(durationSec / avgShot);
    
    const sentences = text.split(/[。！？\n]+/).filter(s => s.trim().length > 3);
    const emotions = [];
    
    let timeOffset = 0;
    for (let i = 0; i < numShots; i++) {
        const sentence = sentences[i % sentences.length] || `镜头${i+1}`;
        const duration = 4 + Math.floor(Math.random() * 5);
        const emotion = analyzeEmotion(sentence);
        
        emotions.push({
            id: i + 1,
            time: `${formatTime(timeOffset)}-${formatTime(timeOffset + duration)}`,
            duration: duration,
            emotion: emotion.type,
            intensity: emotion.intensity,
            content: sentence.substring(0, 25) + (sentence.length > 25 ? '...' : ''),
            layer: emotion.intensity >= 7 ? 'dramatic' : (i % 6 === 0 ? 'emotional' : 'narrative')
        });
        timeOffset += duration;
    }
    
    state.episodes[episodeId].emotions = emotions;
}

// ===== 分析情绪 =====
function analyzeEmotion(text) {
    const map = {
        '惊': { type: '惊讶', base: 7 }, '怕': { type: '恐惧', base: 6 },
        '爱': { type: '爱意', base: 8 }, '恨': { type: '愤怒', base: 7 },
        '哭': { type: '悲伤', base: 7 }, '笑': { type: '喜悦', base: 6 },
        '死': { type: '震撼', base: 9 }, '杀': { type: '紧张', base: 8 },
        '跑': { type: '紧张', base: 5 }, '看': { type: '好奇', base: 4 },
        '说': { type: '对话', base: 4 }, '走': { type: '平静', base: 3 }
    };
    
    let result = { type: '平静', intensity: 3 + Math.floor(Math.random() * 2) };
    for (const [char, em] of Object.entries(map)) {
        if (text.includes(char) && em.base > result.intensity) {
            result = { type: em.type, intensity: Math.min(10, em.base + Math.floor(Math.random() * 2)) };
        }
    }
    if (text.includes('！')) result.intensity = Math.min(10, result.intensity + 1);
    return result;
}

// ===== 渲染编剧部输出 =====
function renderWriterOutput() {
    const ep = state.currentEpisode;
    const emotions = state.episodes[ep].emotions;
    const container = document.getElementById('writerOutput');
    
    container.innerHTML = `
        <div class="dept-output">
            <div class="output-section">
                <h3>📈 情绪曲线（共 ${emotions.length} 个镜头）</h3>
                <div class="emotion-bar-container">
                    ${emotions.slice(0, 50).map(e => `
                        <div class="emotion-bar" style="height: ${e.intensity * 10}%;" title="${e.emotion}"></div>
                    `).join('')}
                </div>
                <p style="color: var(--text-secondary); font-size: 0.85em;">
                    📖 叙事: ${emotions.filter(e => e.layer === 'narrative').length} 个 |
                    🎯 戏剧: ${emotions.filter(e => e.layer === 'dramatic').length} 个 |
                    🎨 情绪: ${emotions.filter(e => e.layer === 'emotional').length} 个
                </p>
            </div>
            
            <div class="output-section">
                <h3>📝 情绪节拍表</h3>
                <div style="max-height: 350px; overflow: auto;">
                    <table class="data-table">
                        <thead>
                            <tr><th>序号</th><th>时间</th><th>情绪</th><th>强度</th><th>内容</th><th>层级</th></tr>
                        </thead>
                        <tbody>
                            ${emotions.map(e => `
                                <tr>
                                    <td>${e.id}</td>
                                    <td>${e.time}</td>
                                    <td>${e.emotion}</td>
                                    <td>${e.intensity}</td>
                                    <td><input class="editable" value="${e.content}" onchange="updateEmotion(${e.id}, 'content', this.value)"></td>
                                    <td>${e.layer === 'narrative' ? '📖叙事' : e.layer === 'dramatic' ? '🎯戏剧' : '🎨情绪'}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// ===== 确认编剧部 =====
function confirmWriter() {
    markNavComplete('writer');
    startArtDept();
}

// ===== 美术部 =====
function startArtDept() {
    const ep = state.currentEpisode;
    document.getElementById('artTitle').textContent = `🎨 美术部 - 第${ep}集`;
    
    setDeptStatus('art', 'working');
    goToStep('art');
    
    setTimeout(() => {
        generateArtDesign(ep);
        setDeptStatus('art', 'done');
        renderArtOutput();
    }, 1500);
}

// ===== 生成美术设计 =====
function generateArtDesign(episodeId) {
    const chapter = state.chapters.find(c => c.id === episodeId);
    const era = state.config.era;
    
    // 人物设定
    const characters = [
        generateCharacter('主角', 1, era),
        generateCharacter('配角', 2, era)
    ];
    
    state.episodes[episodeId].characters = characters;
}

// ===== 生成人物 =====
function generateCharacter(name, id, era) {
    const gender = id === 1 ? '男' : '女';
    return {
        id, name, gender,
        appearance: {
            face: gender === '男' ? '方脸，剑眉' : '瓜子脸，柳眉',
            hair: getHairStyle(era, gender),
            build: '中等身材'
        },
        costume: {
            daily: getCostume(era, gender, 'daily'),
            formal: getCostume(era, gender, 'formal'),
            colors: ['藏青', '灰白', '黑'][id - 1] || '自然色'
        }
    };
}

function getHairStyle(era, gender) {
    if (era.includes('民国')) return gender === '男' ? '短发/平头' : '齐耳短发';
    return gender === '男' ? '现代短发' : '现代长发';
}

function getCostume(era, gender, type) {
    if (era.includes('民国')) {
        if (type === 'daily') return gender === '男' ? '对襟短褂、布裤' : '蓝布衫裤/旗袍';
        return gender === '男' ? '长衫' : '考究旗袍';
    }
    return type === 'daily' ? '便装' : '正装';
}

// ===== 渲染美术部输出 =====
function renderArtOutput() {
    const ep = state.currentEpisode;
    const chars = state.episodes[ep].characters;
    const era = state.eraDetails;
    const container = document.getElementById('artOutput');
    
    container.innerHTML = `
        <div class="dept-output">
            <div class="output-section">
                <h3>📜 时代背景（考据部）</h3>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
                        <strong>🎭 文化背景</strong>
                        <ul style="margin-top: 8px; font-size: 0.85em; color: var(--text-secondary);">
                            ${era.culture.map(c => `<li>${c}</li>`).join('')}
                        </ul>
                    </div>
                    <div style="background: rgba(0,0,0,0.2); padding: 12px; border-radius: 8px;">
                        <strong>🔧 时代道具</strong>
                        <ul style="margin-top: 8px; font-size: 0.85em; color: var(--text-secondary);">
                            ${era.props.slice(0, 5).map(p => `<li>${p}</li>`).join('')}
                        </ul>
                    </div>
                </div>
                <div style="margin-top: 15px; padding: 10px; background: rgba(245,87,108,0.1); border-radius: 8px;">
                    <strong style="color: var(--accent-pink);">⚠️ 考据禁忌</strong>
                    <p style="font-size: 0.85em; margin-top: 5px;">${era.taboos[0]}</p>
                </div>
            </div>
            
            <div class="output-section">
                <h3>👗 人物设定</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">
                    ${chars.map(char => `
                        <div style="background: rgba(0,0,0,0.2); padding: 15px; border-radius: 10px; border-left: 3px solid var(--accent-purple);">
                            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                                <strong>${char.name}</strong>
                                <span style="color: var(--text-secondary); font-size: 0.85em;">${char.gender}</span>
                            </div>
                            <div style="font-size: 0.85em;">
                                <p><strong>外貌：</strong>${char.appearance.face}，${char.appearance.hair}</p>
                                <p><strong>日常：</strong>${char.costume.daily}</p>
                                <p><strong>正装：</strong>${char.costume.formal}</p>
                                <p><strong>配色：</strong>${char.costume.colors}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

// ===== 确认美术部 =====
function confirmArt() {
    markNavComplete('art');
    startDirectorDept();
}

// ===== 导演部 =====
function startDirectorDept() {
    const ep = state.currentEpisode;
    document.getElementById('directorTitle').textContent = `🎥 导演部 - 第${ep}集`;
    
    setDeptStatus('director', 'working');
    goToStep('director');
    
    setTimeout(() => {
        generateDirectorPlan(ep);
        setDeptStatus('director', 'done');
        renderDirectorOutput();
    }, 2000);
}

// ===== 生成导演方案 =====
function generateDirectorPlan(episodeId) {
    const emotions = state.episodes[episodeId].emotions;
    const style = directorStyles[state.config.directorStyle];
    
    const shots = emotions.map((em, i) => {
        const intensity = em.intensity;
        return {
            id: i + 1,
            shotId: `E${episodeId}-S${String(i+1).padStart(3,'0')}`,
            time: em.time,
            content: em.content,
            emotion: em.emotion,
            intensity: intensity,
            
            // 导演部综合方案
            plan: {
                // 分镜
                shotType: intensity >= 9 ? '特写' : intensity >= 7 ? '近景' : intensity >= 5 ? '中景' : '全景',
                movement: intensity >= 7 ? '缓慢推近/跟拍' : '固定',
                composition: intensity >= 7 ? '三分法，主体突出' : '自然构图',
                
                // 摄影
                aperture: intensity >= 8 ? 'f/1.4-1.8' : 'f/2.8-4',
                focalLength: intensity >= 8 ? '85mm' : '50mm',
                
                // 灯光
                keyLight: intensity >= 7 ? '侧光45°，强调轮廓' : '柔和主光',
                lightRatio: intensity >= 7 ? '1:4高对比' : '1:2柔和',
                
                // 调色
                colorTemp: intensity >= 7 ? '根据情绪调整' : '5600K自然',
                saturation: intensity >= 7 ? '提高饱和' : '正常',
                lut: style.color,
                
                // 表演指导
                expression: getExpression(em.emotion, intensity),
                bodyLanguage: intensity >= 7 ? '情绪外化' : '自然状态'
            }
        };
    });
    
    state.episodes[episodeId].shots = shots;
}

function getExpression(emotion, intensity) {
    const map = {
        '悲伤': '眉头微皱', '喜悦': '嘴角上扬', '愤怒': '眉头紧锁',
        '恐惧': '瞳孔放大', '惊讶': '眼睛睁大', '平静': '神态自然'
    };
    return (map[emotion] || '自然表情') + (intensity >= 8 ? '（强烈）' : '');
}

// ===== 渲染导演部输出 =====
function renderDirectorOutput() {
    const ep = state.currentEpisode;
    const shots = state.episodes[ep].shots;
    const container = document.getElementById('directorOutput');
    
    container.innerHTML = `
        <div class="dept-output">
            <div class="output-section">
                <h3>🎥 导演部综合方案（${shots.length} 个镜头）</h3>
                <p style="color: var(--text-secondary); font-size: 0.85em; margin-bottom: 15px;">
                    包含：分镜 + 摄影 + 灯光 + 调色 + 表演指导
                </p>
                <div style="max-height: 400px; overflow: auto;">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>镜号</th>
                                <th>情绪</th>
                                <th>📐 分镜</th>
                                <th>📷 摄影</th>
                                <th>💡 灯光</th>
                                <th>🌈 调色</th>
                                <th>🎭 表演</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${shots.map(s => `
                                <tr>
                                    <td><strong>${s.shotId}</strong><br><small>${s.time}</small></td>
                                    <td>${s.emotion}<br><small>强度${s.intensity}</small></td>
                                    <td><small>${s.plan.shotType}<br>${s.plan.movement}</small></td>
                                    <td><small>${s.plan.aperture}<br>${s.plan.focalLength}</small></td>
                                    <td><small>${s.plan.keyLight}<br>${s.plan.lightRatio}</small></td>
                                    <td><small>${s.plan.colorTemp}<br>${s.plan.lut}</small></td>
                                    <td><small>${s.plan.expression}</small></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// ===== 确认导演部 =====
function confirmDirector() {
    markNavComplete('director');
    startMusicDept();
}

// ===== 音乐部 =====
function startMusicDept() {
    const ep = state.currentEpisode;
    document.getElementById('musicTitle').textContent = `🎵 音乐部 - 第${ep}集`;
    
    setDeptStatus('music', 'working');
    goToStep('music');
    
    setTimeout(() => {
        generateMusicPlan(ep);
        setDeptStatus('music', 'done');
        renderMusicOutput();
    }, 1500);
}

// ===== 生成音乐方案 =====
function generateMusicPlan(episodeId) {
    const shots = state.episodes[episodeId].shots;
    
    const music = shots.map(s => ({
        shotId: s.shotId,
        time: s.time,
        emotion: s.emotion,
        intensity: s.intensity,
        
        // 三轨配乐
        mainMelody: {
            active: s.intensity >= 5,
            instruments: s.intensity >= 7 ? '二胡/弦乐主奏' : '轻音铺底',
            dynamics: s.intensity >= 7 ? '渐强(cresc.)' : '稳定(mp)',
            prompt: `${s.emotion}情绪, ${s.intensity >= 7 ? '情感充沛' : '克制内敛'}, 弦乐为主`
        },
        subMelody: {
            active: s.intensity >= 4,
            instruments: '和声支撑',
            dynamics: '跟随主旋律'
        },
        ambient: {
            type: getAmbientType(s.emotion),
            volume: '背景层(pp)'
        },
        transition: s.intensity >= 7 ? '🔺渐强' : '➡️平滑'
    }));
    
    state.episodes[episodeId].music = music;
}

function getAmbientType(emotion) {
    const map = { '悲伤': '雨声/风声', '喜悦': '鸟鸣', '恐惧': '心跳', '平静': '自然环境音' };
    return map[emotion] || '场景环境音';
}

// ===== 渲染音乐部输出 =====
function renderMusicOutput() {
    const ep = state.currentEpisode;
    const music = state.episodes[ep].music;
    const container = document.getElementById('musicOutput');
    
    container.innerHTML = `
        <div class="dept-output">
            <div class="output-section">
                <h3>🎵 三轨配乐方案</h3>
                
                <!-- 音轨可视化 -->
                <div style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; margin-bottom: 20px;">
                    <div style="display: flex; gap: 10px; margin-bottom: 8px;">
                        <span style="width: 70px; color: var(--accent-pink); font-size: 0.8em;">🎼 主旋律</span>
                        <div style="flex: 1; height: 20px; display: flex; gap: 1px;">
                            ${music.slice(0, 40).map(m => `
                                <div style="flex: 1; height: 100%; background: ${m.mainMelody.active ? 
                                    (m.intensity >= 7 ? 'var(--accent-pink)' : 'rgba(245,87,108,0.4)') : 
                                    'rgba(255,255,255,0.1)'}; border-radius: 2px;"></div>
                            `).join('')}
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px; margin-bottom: 8px;">
                        <span style="width: 70px; color: var(--accent-blue); font-size: 0.8em;">🎵 副旋律</span>
                        <div style="flex: 1; height: 20px; display: flex; gap: 1px;">
                            ${music.slice(0, 40).map(m => `
                                <div style="flex: 1; height: 100%; background: ${m.subMelody.active ? 
                                    'rgba(79,172,254,0.5)' : 'rgba(255,255,255,0.1)'}; border-radius: 2px;"></div>
                            `).join('')}
                        </div>
                    </div>
                    <div style="display: flex; gap: 10px;">
                        <span style="width: 70px; color: var(--accent-green); font-size: 0.8em;">🌊 环境音</span>
                        <div style="flex: 1; height: 20px; display: flex; gap: 1px;">
                            ${music.slice(0, 40).map(() => `
                                <div style="flex: 1; height: 100%; background: rgba(107,203,119,0.3); border-radius: 2px;"></div>
                            `).join('')}
                        </div>
                    </div>
                </div>
                
                <div style="max-height: 300px; overflow: auto;">
                    <table class="data-table">
                        <thead>
                            <tr><th>镜号</th><th>过渡</th><th>🎼 主旋律</th><th>🎵 副旋律</th><th>🌊 环境音</th></tr>
                        </thead>
                        <tbody>
                            ${music.slice(0, 30).map(m => `
                                <tr>
                                    <td>${m.shotId}</td>
                                    <td>${m.transition}</td>
                                    <td><small>${m.mainMelody.instruments}<br>${m.mainMelody.dynamics}</small></td>
                                    <td><small>${m.subMelody.instruments}</small></td>
                                    <td><small>${m.ambient.type}</small></td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

// ===== 确认音乐部 =====
function confirmMusic() {
    markNavComplete('music');
    goToExport();
}

// ===== 导出页 =====
function goToExport() {
    const ep = state.currentEpisode;
    document.getElementById('exportTitle').textContent = `📥 导出 - 第${ep}集`;
    goToStep('export');
    renderExportSummary();
}

function renderExportSummary() {
    const ep = state.currentEpisode;
    const shots = state.episodes[ep].shots;
    const container = document.getElementById('exportSummary');
    
    container.innerHTML = `
        <h4 style="margin-bottom: 15px;">📊 第${ep}集制作完成</h4>
        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; text-align: center;">
            <div style="background: rgba(79,172,254,0.1); padding: 15px; border-radius: 8px;">
                <div style="font-size: 2em;">${shots.length}</div>
                <div style="font-size: 0.85em; color: var(--text-secondary);">镜头数</div>
            </div>
            <div style="background: rgba(245,87,108,0.1); padding: 15px; border-radius: 8px;">
                <div style="font-size: 2em;">5</div>
                <div style="font-size: 0.85em; color: var(--text-secondary);">部门参与</div>
            </div>
            <div style="background: rgba(240,147,251,0.1); padding: 15px; border-radius: 8px;">
                <div style="font-size: 2em;">${state.episodes[ep].characters.length}</div>
                <div style="font-size: 0.85em; color: var(--text-secondary);">人物设定</div>
            </div>
            <div style="background: rgba(107,203,119,0.1); padding: 15px; border-radius: 8px;">
                <div style="font-size: 2em;">55+</div>
                <div style="font-size: 0.85em; color: var(--text-secondary);">Excel列数</div>
            </div>
        </div>
    `;
}

// ===== 导出Excel =====
function exportExcel() {
    const ep = state.currentEpisode;
    const shots = state.episodes[ep].shots;
    
    const headers = ['镜号','时间','情绪','强度','景别','运镜','光圈','焦段','主光','灯光比','色温','调色','表情','主旋律','副旋律','环境音'];
    const rows = shots.map((s, i) => {
        const m = state.episodes[ep].music[i];
        return [
            s.shotId, s.time, s.emotion, s.intensity,
            s.plan.shotType, s.plan.movement, s.plan.aperture, s.plan.focalLength,
            s.plan.keyLight, s.plan.lightRatio, s.plan.colorTemp, s.plan.lut,
            s.plan.expression,
            m?.mainMelody.instruments || '', m?.subMelody.instruments || '', m?.ambient.type || ''
        ];
    });
    
    const csv = [headers.join(','), ...rows.map(r => r.map(c => `"${c}"`).join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `分镜表_第${ep}集.csv`;
    a.click();
}

// ===== 导出JSON =====
function exportJSON() {
    const ep = state.currentEpisode;
    const data = {
        episode: ep,
        chapter: state.chapters.find(c => c.id === ep),
        ...state.episodes[ep]
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `第${ep}集_数据.json`;
    a.click();
}

// ===== 复制Prompt =====
function copyPrompts() {
    const ep = state.currentEpisode;
    const shots = state.episodes[ep].shots;
    const prompts = shots.map(s => `${s.shotId}: ${s.content}, ${s.plan.shotType}, ${s.plan.lut}`).join('\n');
    navigator.clipboard.writeText(prompts);
    alert('Prompt已复制！');
}

// ===== 完成当前集 =====
function finishEpisode() {
    const ep = state.currentEpisode;
    state.chapters.find(c => c.id === ep).completed = true;
    state.episodes[ep].completed = true;
    
    document.getElementById('statCompleted').textContent = 
        state.chapters.filter(c => c.completed).length;
    
    // 返回章节选择
    state.currentEpisode = null;
    document.getElementById('episodeNav').style.display = 'none';
    resetDeptStatus();
    
    goToStep('chapters');
    renderChaptersOverview();
    updateEpisodeProgress();
}

// ===== 辅助函数 =====
function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, '0')}`;
}

function goToStep(step) {
    document.querySelectorAll('.step-panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`step-${step}`).classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    const navItem = document.querySelector(`.nav-item[data-step="${step}"]`);
    if (navItem) navItem.classList.add('active');
}

function goBack() {
    goToStep('input');
}

function backToEpisodes() {
    state.currentEpisode = null;
    document.getElementById('episodeNav').style.display = 'none';
    goToStep('chapters');
}

function markNavComplete(step) {
    const nav = document.querySelector(`.nav-item[data-step="${step}"]`);
    if (nav) nav.classList.add('completed');
}

function setDeptStatus(dept, status) {
    departments[dept].status = status;
    updateDeptStatus();
}

function resetDeptStatus() {
    Object.keys(departments).forEach(d => departments[d].status = 'waiting');
    updateDeptStatus();
}

function updateDeptStatus() {
    const container = document.getElementById('deptStatus');
    container.innerHTML = Object.entries(departments).map(([k, d]) => `
        <div class="dept-item">
            <span>${d.icon} ${d.name}</span>
            <span class="status ${d.status}">${d.status === 'waiting' ? '待命' : d.status === 'working' ? '工作中' : '✓'}</span>
        </div>
    `).join('');
}

function updateEpisodeProgress() {
    const container = document.getElementById('episodeProgress');
    container.innerHTML = state.chapters.map(ch => `
        <div class="progress-item ${ch.completed ? 'done' : ''} ${state.currentEpisode === ch.id ? 'current' : ''}">
            <span class="progress-dot"></span>
            <span>第${ch.id}集</span>
            <span style="margin-left: auto; font-size: 0.8em; color: var(--text-secondary);">
                ${ch.completed ? '✅' : ch.duration + '分钟'}
            </span>
        </div>
    `).join('');
}

function generateEraDetails(era, story) {
    return {
        period: era,
        culture: era.includes('民国') ? ['新旧交替', '西化影响', '等级松动'] : ['现代都市'],
        props: era.includes('民国') ? ['人力车', '煤油灯', '铜钱', '算盘', '报纸'] : ['现代物品'],
        taboos: era.includes('民国') ? ['不要出现塑料、电器等现代物品'] : ['注意时代一致性']
    };
}

function regenerateChapters() { analyzeAndDivideChapters(); }
function regenerateWriter() { generateEmotions(state.currentEpisode); renderWriterOutput(); }
function regenerateArt() { generateArtDesign(state.currentEpisode); renderArtOutput(); }
function regenerateDirector() { generateDirectorPlan(state.currentEpisode); renderDirectorOutput(); }
function regenerateMusic() { generateMusicPlan(state.currentEpisode); renderMusicOutput(); }
function updateEmotion(id, field, value) { 
    const em = state.episodes[state.currentEpisode].emotions.find(e => e.id === id);
    if (em) em[field] = value;
}
