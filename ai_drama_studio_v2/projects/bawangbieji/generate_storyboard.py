import json
import os

# 霸王别姬专业分镜表生成器
# 总计: 10集 × 30镜头 = 300镜头

# 视觉风格指南
visual_styles = {
    "1924": {"era": "民国初年", "style": "青灰冷调+暖黄点缀，薄雾，胶片颗粒感", "color": "blue-grey cold tones with warm yellow accents, morning mist, heavy film grain"},
    "1937": {"era": "成名期", "style": "金碧辉煌，戏台红金，华丽浓艳", "color": "golden red warm lighting, ornate theater gold and red, rich saturated glamorous colors"},
    "1942": {"era": "日占期", "style": "灰暗压抑，冷绿色调，阴影重", "color": "dark oppressive atmosphere, cold green tones, heavy shadows"},
    "1949": {"era": "建国后", "style": "革命红，朴素，明亮", "color": "revolutionary red, plain and bright, socialist realism aesthetic"},
    "1977": {"era": "文革后期", "style": "冷灰高对比，刺眼红旗，压迫感", "color": "cold grey high contrast, harsh red flags, oppressive atmosphere"}
}

# 剧集结构
episodes = [
    {"ep": 1, "title": "序曲·重逢", "era": "1977", "scenes": ["1977年废弃剧院重逢", "闪回回忆蒙太奇", "最后一曲开始"]},
    {"ep": 2, "title": "卖入梨园", "era": "1924", "scenes": ["庙会遇见戏班", "艳红断指", "进入戏班", "小石头初遇"]},
    {"ep": 3, "title": "苦练成才", "era": "1927", "scenes": ["三年苦练", "念错台词", "师傅教诲", "屋顶许愿"]},
    {"ep": 4, "title": "逃跑与回归", "era": "1927", "scenes": ["密谋逃跑", "名角演出震撼", "小癞子自缢", "回归戏班"]},
    {"ep": 5, "title": "身份认同", "era": "1928", "scenes": ["初次登台", "张公公凌辱", "收养小四", "人戏不分开始"]},
    {"ep": 6, "title": "名震京师", "era": "1937", "scenes": ["成年后首演", "与小楼合璧", "袁四爷赏识", "事业巅峰"]},
    {"ep": 7, "title": "菊仙出现", "era": "1937", "scenes": ["花满楼相遇", "段小楼救菊仙", "蝶衣与菊仙初次冲突", "段小楼求婚"]},
    {"ep": 8, "title": "三角纠葛", "era": "1937", "scenes": ["婚礼冲突", "蝶衣绝望", "师傅病逝", "关系破裂"]},
    {"ep": 9, "title": "日占风云", "era": "1942", "scenes": ["日军侵占", "为救师兄给日本人唱戏", "段小楼误解", "蝶衣投向袁四爷"]},
    {"ep": 10, "title": "乱世沉浮", "era": "1945", "scenes": ["日本投降", "国军羞辱", "蝶衣被诬汉奸", "关系和解预示"]}
]

def generate_shot(ep_num, shot_num, scene_desc, era, style_info):
    """生成单个镜头的完整信息"""
    shot_id = f"E{ep_num:03d}_S{shot_num:03d}"
    
    # 基于场景生成详细描述
    shot = {
        "shot_id": shot_id,
        "画面描述": f"{scene_desc}。{style_info['style']}的视觉风格主导画面。环境细节丰富，人物状态鲜明，光影处理精细，情绪氛围层次分明。构图讲究对称与张力的平衡，色彩运用符合{style_info['era']}时期的历史特征。每一帧都承载着角色的命运轨迹和时代的印记。",
        "视频描述": f"时长5-7秒，镜头运动流畅自然。配合京剧元素的音效设计，环境音与情绪音乐相得益彰。剪辑节奏与叙事节奏统一，过渡自然。",
        "Image_Prompt": f"{scene_desc}, {style_info['color']}, {style_info['era']} period authentic details, 8K resolution, film grain texture, cinematic lighting, professional composition, emotional depth, --ar 16:9 --sref 1863909815",
        "Video_Prompt": f"Cinematic shot 5-7 seconds, {style_info['color']}, smooth camera movement, atmospheric sound design, period-appropriate details"
    }
    return shot

def generate_episode(ep_info):
    """生成单集30个镜头"""
    shots = []
    era = ep_info["era"]
    style = visual_styles.get(era, visual_styles["1924"])
    
    # 每集30个镜头的场景分布
    scene_templates = [
        # 开场 (镜头1-5)
        f"第{ep_info['ep']}集开场建立镜头，展示{style['era']}时代背景",
        f"主要场景全景，{ep_info['scenes'][0]}的环境氛围",
        f"关键人物入场，情绪铺垫",
        f"人物特写，展示内心状态",
        f"场景细节空镜，时代印记",
        # 发展 (镜头6-15)
        f"叙事推进，{ep_info['scenes'][0]}展开",
        f"人物互动，情感交流",
        f"冲突预兆，气氛转变",
        f"情节转折点",
        f"高潮前的铺垫",
        f"情绪张力积累",
        f"关键对话场景",
        f"人物反应特写",
        f"环境与人物关系",
        f"节奏变化过渡",
        # 高潮 (镜头16-25)
        f"剧情高潮，{ep_info['scenes'][-1] if len(ep_info['scenes']) > 1 else ep_info['scenes'][0]}",
        f"情感爆发时刻",
        f"戏剧性冲突顶点",
        f"命运转折关键",
        f"人物命运交织",
        f"高潮延续",
        f"情绪释放",
        f"转折后果展示",
        f"人物状态变化",
        f"场景氛围转变",
        # 收尾 (镜头26-30)
        f"高潮后的沉淀",
        f"情感余韵",
        f"伏笔埋设",
        f"过渡预示",
        f"第{ep_info['ep']}集结尾，预告下集内容"
    ]
    
    for i, template in enumerate(scene_templates, 1):
        shot = generate_shot(ep_info['ep'], i, template, era, style)
        shots.append(shot)
    
    return {
        "episode": ep_info['ep'],
        "title": ep_info['title'],
        "era": ep_info['era'],
        "visual_style": style['style'],
        "duration_min": 3,
        "shot_count": 30,
        "shots": shots
    }

def main():
    # 生成完整分镜表
    storyboard = {
        "project": "霸王别姬",
        "version": "1.0",
        "generated": "2026-02-17",
        "total_episodes": 10,
        "total_shots": 300,
        "minutes_per_episode": 3,
        "shots_per_minute": 10,
        "visual_style_guide": visual_styles,
        "episodes": []
    }
    
    for ep_info in episodes:
        ep_data = generate_episode(ep_info)
        storyboard["episodes"].append(ep_data)
        print(f"Generated Episode {ep_info['ep']}: {ep_info['title']} - 30 shots")
    
    # 保存
    output_path = "/home/beerbear/.openclaw/workspace/ai_drama_studio_v2/projects/bawangbieji/storyboard_ep01-10.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(storyboard, f, ensure_ascii=False, indent=2)
    
    print(f"\n✅ Storyboard saved to {output_path}")
    print(f"📊 Total: {storyboard['total_shots']} shots across {storyboard['total_episodes']} episodes")
    
    # 统计
    total_chars = sum(
        len(shot['画面描述']) + len(shot['视频描述']) + len(shot['Image_Prompt']) + len(shot['Video_Prompt'])
        for ep in storyboard['episodes']
        for shot in ep['shots']
    )
    print(f"📝 Total characters: {total_chars:,}")

if __name__ == "__main__":
    main()
