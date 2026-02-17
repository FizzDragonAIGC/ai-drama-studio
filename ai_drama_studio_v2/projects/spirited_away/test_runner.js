#!/usr/bin/env node
/**
 * 千与千寻 - 5模式完整测试
 * 正确调用API格式：/api/agent/:agentId  body: { content, context }
 */

const fs = require('fs');
const path = require('path');

const API_BASE = 'http://34.58.33.115:3001';
const PROJECT_DIR = '/home/beerbear/.openclaw/workspace/ai_drama_studio_v2/projects/spirited_away';

// 读取源文件
const novelContent = fs.readFileSync(path.join(PROJECT_DIR, 'source.md'), 'utf-8');

// 测试配置
const TESTS = [
    { name: 'lite_30ep_5min', mode: 'lite', episodes: 30, duration: 5 },
    { name: 'lite_100ep_2min', mode: 'lite', episodes: 100, duration: 2 },
    { name: 'standard_5ep_10min', mode: 'standard', episodes: 5, duration: 10 },
    { name: 'standard_24ep_8min', mode: 'standard', episodes: 24, duration: 8 },
    { name: 'pro_40ep_10min', mode: 'pro', episodes: 40, duration: 10 }
];

async function callAgent(agentName, content, context = {}) {
    const startTime = Date.now();
    try {
        const response = await fetch(`${API_BASE}/api/agent/${agentName}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, context })
        });
        
        const data = await response.json();
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        
        if (!response.ok) {
            throw new Error(data.error || `HTTP ${response.status}`);
        }
        
        return { 
            success: true, 
            result: data.result,
            tokens: data.tokens || {},
            elapsed
        };
    } catch (error) {
        const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
        return { success: false, error: error.message, elapsed };
    }
}

function truncate(text, max = 2000) {
    if (typeof text !== 'string') text = JSON.stringify(text);
    return text.length > max ? text.substring(0, max) + '...' : text;
}

async function runTest(config) {
    const { name, mode, episodes, duration } = config;
    const outputDir = path.join(PROJECT_DIR, 'results', name);
    
    fs.mkdirSync(outputDir, { recursive: true });
    
    const shotsPerEp = duration * 10; // 每分钟10镜头
    const totalShots = episodes * shotsPerEp;
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`测试: ${name}`);
    console.log(`模式: ${mode} | 集数: ${episodes} | 时长: ${duration}分钟/集`);
    console.log(`预计镜头: ${totalShots} (${shotsPerEp}镜头/集)`);
    console.log(`${'='.repeat(60)}`);
    
    const results = { config, agents: {}, totalTime: 0 };
    const startTime = Date.now();
    
    // 1. Interview
    console.log('[1/7] Interview Agent...');
    const interview = await callAgent('interview', novelContent, {
        title: '千与千寻',
        author: '宫崎骏',
        mode
    });
    results.agents.interview = interview;
    if (!interview.success) {
        console.log(`  ✗ ${interview.error}`);
        return results;
    }
    console.log(`  ✓ ${interview.elapsed}s | ${interview.tokens.output || '?'} tokens`);
    fs.writeFileSync(path.join(outputDir, '01_interview.json'), JSON.stringify(interview, null, 2));
    
    // 2. Concept
    console.log('[2/7] Concept Agent...');
    const concept = await callAgent('concept', novelContent, {
        title: '千与千寻',
        interview: truncate(interview.result),
        mode
    });
    results.agents.concept = concept;
    if (!concept.success) {
        console.log(`  ✗ ${concept.error}`);
        return results;
    }
    console.log(`  ✓ ${concept.elapsed}s | ${concept.tokens.output || '?'} tokens`);
    fs.writeFileSync(path.join(outputDir, '02_concept.json'), JSON.stringify(concept, null, 2));
    
    // 3. Chapters (narrative)
    console.log(`[3/7] Narrative Agent (${episodes}集 x ${duration}分钟)...`);
    const chaptersContent = `
标题：千与千寻
集数：${episodes}集
每集时长：${duration}分钟
每集镜头数：${shotsPerEp}
总镜头数：${totalShots}

原作内容：
${novelContent}

概念设计：
${truncate(concept.result)}
`;
    const chapters = await callAgent('narrative', chaptersContent, {
        episodes,
        duration,
        mode
    });
    results.agents.chapters = chapters;
    if (!chapters.success) {
        console.log(`  ✗ ${chapters.error}`);
        return results;
    }
    console.log(`  ✓ ${chapters.elapsed}s | ${chapters.tokens.output || '?'} tokens`);
    fs.writeFileSync(path.join(outputDir, '03_chapters.json'), JSON.stringify(chapters, null, 2));
    
    // 4. Characters
    console.log('[4/7] Character Agent...');
    const characters = await callAgent('character', novelContent, {
        title: '千与千寻',
        interview: truncate(interview.result),
        concept: truncate(concept.result),
        mode
    });
    results.agents.characters = characters;
    if (!characters.success) {
        console.log(`  ✗ ${characters.error}`);
        return results;
    }
    console.log(`  ✓ ${characters.elapsed}s | ${characters.tokens.output || '?'} tokens`);
    fs.writeFileSync(path.join(outputDir, '04_characters.json'), JSON.stringify(characters, null, 2));
    
    // 5. Art Director
    console.log('[5/7] ArtDirector Agent...');
    const artContent = `
标题：千与千寻
风格：吉卜力手绘动画

角色设定：
${truncate(characters.result)}

概念设计：
${truncate(concept.result)}
`;
    const artdirector = await callAgent('artdirector', artContent, { mode });
    results.agents.artdirector = artdirector;
    if (!artdirector.success) {
        console.log(`  ✗ ${artdirector.error}`);
        return results;
    }
    console.log(`  ✓ ${artdirector.elapsed}s | ${artdirector.tokens.output || '?'} tokens`);
    fs.writeFileSync(path.join(outputDir, '05_artdirector.json'), JSON.stringify(artdirector, null, 2));
    
    // 6. Screenwriter
    console.log('[6/7] Screenwriter Agent...');
    const scriptContent = `
标题：千与千寻
集数：${episodes}集，每集${duration}分钟

章节大纲：
${truncate(chapters.result, 3000)}

角色设定：
${truncate(characters.result)}

请为前5集撰写详细剧本大纲。
`;
    const screenwriter = await callAgent('screenwriter', scriptContent, { episodes, duration, mode });
    results.agents.screenwriter = screenwriter;
    if (!screenwriter.success) {
        console.log(`  ✗ ${screenwriter.error}`);
        return results;
    }
    console.log(`  ✓ ${screenwriter.elapsed}s | ${screenwriter.tokens.output || '?'} tokens`);
    fs.writeFileSync(path.join(outputDir, '06_screenwriter.json'), JSON.stringify(screenwriter, null, 2));
    
    // 7. Storyboard
    console.log('[7/7] Storyboard Agent...');
    const storyboardContent = `
标题：千与千寻
集数：${episodes}集
每集时长：${duration}分钟
每集镜头数：${shotsPerEp} (每分钟10镜头)

美术风格：
${truncate(artdirector.result)}

剧本大纲：
${truncate(screenwriter.result, 3000)}

请生成前3集的分镜表，每集至少${shotsPerEp}个镜头，包含：
1. 镜头编号
2. 镜头类型（远/中/近/特写）
3. 机位
4. 画面描述
5. 角色动作
6. 台词/旁白
7. 情绪氛围
8. 时长(秒)
9. AI生成Prompt
`;
    const storyboard = await callAgent('storyboard', storyboardContent, { 
        episodes: Math.min(episodes, 3), 
        duration, 
        shotsPerEp,
        mode 
    });
    results.agents.storyboard = storyboard;
    if (!storyboard.success) {
        console.log(`  ✗ ${storyboard.error}`);
        return results;
    }
    console.log(`  ✓ ${storyboard.elapsed}s | ${storyboard.tokens.output || '?'} tokens`);
    fs.writeFileSync(path.join(outputDir, '07_storyboard.json'), JSON.stringify(storyboard, null, 2));
    
    // 总结
    results.totalTime = ((Date.now() - startTime) / 1000).toFixed(1);
    results.success = true;
    
    // 计算总token
    let totalTokens = { input: 0, output: 0 };
    for (const [name, agent] of Object.entries(results.agents)) {
        if (agent.tokens) {
            totalTokens.input += agent.tokens.input || 0;
            totalTokens.output += agent.tokens.output || 0;
        }
    }
    results.totalTokens = totalTokens;
    
    fs.writeFileSync(path.join(outputDir, 'summary.json'), JSON.stringify(results, null, 2));
    
    console.log(`\n测试 ${name} 完成!`);
    console.log(`总耗时: ${results.totalTime}s`);
    console.log(`总Tokens: ${totalTokens.input + totalTokens.output}`);
    console.log(`输出: ${outputDir}`);
    
    return results;
}

async function main() {
    console.log('============================================================');
    console.log('《千与千寻》5模式完整测试');
    console.log(`API: ${API_BASE}`);
    console.log('============================================================');
    
    const allResults = [];
    
    for (const test of TESTS) {
        try {
            const result = await runTest(test);
            allResults.push({ 
                test: test.name, 
                success: result.success || false, 
                totalTime: result.totalTime,
                totalTokens: result.totalTokens
            });
        } catch (error) {
            console.error(`测试 ${test.name} 失败:`, error.message);
            allResults.push({ test: test.name, success: false, error: error.message });
        }
    }
    
    // 最终汇总
    console.log('\n============================================================');
    console.log('测试汇总');
    console.log('============================================================');
    for (const r of allResults) {
        const status = r.success ? `✓ ${r.totalTime}s (${r.totalTokens?.input + r.totalTokens?.output} tokens)` : `✗ ${r.error || 'failed'}`;
        console.log(`${r.test}: ${status}`);
    }
    
    fs.writeFileSync(
        path.join(PROJECT_DIR, 'results', 'all_tests_summary.json'),
        JSON.stringify(allResults, null, 2)
    );
    
    console.log('\n所有测试完成!');
    console.log(`结果保存在: ${PROJECT_DIR}/results/`);
}

main().catch(console.error);
