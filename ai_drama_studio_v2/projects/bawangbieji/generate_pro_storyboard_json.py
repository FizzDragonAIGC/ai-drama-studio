#!/usr/bin/env python3
"""
《霸王别姬》专业级分镜表生成器 - JSON格式
100集 × 30镜头 = 3000镜头
每个镜头包含详细的画面描述、视频描述、Image_Prompt、Video_Prompt
"""

import json
import random

# 时代配置
TIME_PERIODS = {
    "民国初年": {
        "episodes": (1, 30),
        "years": "1924-1937",
        "color_cn": "暖黄、琥珀、老照片褐色调",
        "color_en": "warm amber, sepia tone, vintage golden hue",
        "lighting_cn": "油灯暖光、晨曦微光、烛火摇曳",
        "lighting_en": "warm oil lamp glow, soft morning light, flickering candlelight",
        "mood_cn": "苦涩温情、童年创伤、纯真残酷并存",
        "mood_en": "bittersweet nostalgia, childhood trauma, innocent cruelty",
        "sref": "1863909815"
    },
    "成名期": {
        "episodes": (31, 50),
        "years": "1937-1945",
        "color_cn": "金碧辉煌、戏彩浓艳、朱红金黄",
        "color_en": "opulent gold and crimson, vibrant Peking opera colors, rich vermillion",
        "lighting_cn": "舞台追光、华丽灯火、璀璨霓虹",
        "lighting_en": "theatrical spotlight, glamorous stage lighting, dazzling theater lights",
        "mood_cn": "绚烂繁华、暗流涌动、爱恨纠葛",
        "mood_en": "glamorous prosperity, underlying tension, love and jealousy",
        "sref": "2847561923"
    },
    "抗战后期": {
        "episodes": (51, 65),
        "years": "1945-1949",
        "color_cn": "灰暗压抑、军绿土黄、血红点缀",
        "color_en": "desaturated gray, military olive, earthy tones with blood red accents",
        "lighting_cn": "阴沉天光、惨白灯泡、战火余烬",
        "lighting_en": "overcast daylight, harsh bare bulbs, smoldering embers",
        "mood_cn": "屈辱愤怒、动荡不安、绝望挣扎",
        "mood_en": "humiliation and rage, turbulent chaos, desperate struggle",
        "sref": "3958274610"
    },
    "建国后": {
        "episodes": (66, 80),
        "years": "1949-1966",
        "color_cn": "政治红、灰蓝工装、褪色戏服",
        "color_en": "propaganda red, blue-gray worker uniforms, faded costumes",
        "lighting_cn": "日光灯、标语红光、工厂白光",
        "lighting_en": "fluorescent lighting, red banner glow, industrial white light",
        "mood_cn": "压抑改造、身份困惑、沉沦戒断",
        "mood_en": "oppressive reform, identity crisis, addiction and withdrawal",
        "sref": "4721839056"
    },
    "文革浩劫": {
        "episodes": (81, 100),
        "years": "1966-1977",
        "color_cn": "冷灰焦黑、惨白刺目、血红飞溅",
        "color_en": "cold gray, charred black, stark white, blood red splatter",
        "lighting_cn": "批斗场强光、阴暗角落、废墟微光",
        "lighting_en": "harsh interrogation light, dark corners, ruins in dim light",
        "mood_cn": "疯狂绝望、互相揭发、悲剧收场",
        "mood_en": "madness and despair, mutual betrayal, tragic finale",
        "sref": "5839274610"
    }
}

# 场景详细配置
SCENES = {
    "1977年闲置剧院": {
        "desc_template": "1977年北京某处废弃的老剧院，尘封二十余年。{detail}阳光从破碎的天窗斜射而入，在漫天飞舞的灰尘中形成几道苍白的光柱。舞台上的红色帷幕早已褪色发灰，木质地板在脚步下发出沉闷的咯吱声。空气中弥漫着霉味和旧时代的回忆。{action_desc}",
        "details": ["观众席的红木座椅上落满厚厚的灰尘，有些已经倾倒损坏。", "后台的化妆镜碎裂成蛛网状，映出扭曲的倒影。", "角落里堆放着残破的戏服和道具，仿佛时间在此凝固。"],
        "en_base": "1977 abandoned Beijing opera theater, dusty interior, sunbeams through broken skylight, particles floating in air, faded red velvet curtains, worn wooden stage floor, decaying elegance"
    },
    "北平庙会": {
        "desc_template": "1920年代北平庙会，{time_desc}。{detail}人群熙熙攘攘，叫卖声此起彼伏。小贩们推着独轮车，叫卖着糖葫芦、面人、糖画。{action_desc}远处传来锣鼓声和杂耍艺人的吆喝。",
        "details": ["青石板路上挤满了穿长袍马褂的行人，妇女们头戴绒花，孩子们追逐嬉戏。", "香烛摊位青烟缭绕，算命先生摇着卦筒招揽生意。", "戏台子前围满了看热闹的百姓，台上正演着皮影戏。"],
        "time_descs": ["清晨薄雾笼罩，青石板路湿漉漉反射着天光", "正午阳光炽烈，人潮涌动热气蒸腾", "黄昏时分，夕阳将一切染成金红色"],
        "en_base": "1920s Peking temple fair, crowded marketplace, traditional vendors, candied hawthorn sellers, folk performances, bluestone pavement, bustling crowd in traditional clothing"
    },
    "关家科班练功房": {
        "desc_template": "关家戏班的练功房，{detail}宽敞的厅堂中央是打磨得发亮的木地板，四壁挂满了练功用的藤条和棍棒。{action_desc}空气中弥漫着汗水和松香的气味，偶尔传来师傅严厉的呵斥声。",
        "details": ["几十个光着膀子的学徒正在压腿劈叉，汗水浸透了练功裤。", "墙角放着大水缸，累极了的孩子们偷偷喝水。", "晨光从高窗斜照进来，照亮了飞扬的灰尘。"],
        "en_base": "1920s Peking opera training hall, polished wooden floor, training equipment on walls, young students practicing, harsh discipline atmosphere, warm morning light through high windows"
    },
    "科班宿舍": {
        "desc_template": "戏班学徒的大通铺宿舍，{detail}狭长的房间里摆着两排木板床，每张床上铺着薄薄的棉褥。{action_desc}昏暗的油灯投下摇曳的影子，角落里传来孩子们压抑的啜泣声。",
        "details": ["十几个孩子挤在一起，共享着磨损的被褥取暖。", "床头放着各自的小包袱，那是他们全部的家当。", "窗外是漆黑的夜，只有远处的犬吠偶尔打破寂静。"],
        "en_base": "1920s dormitory for opera students, wooden bunk beds, thin bedding, dim oil lamp, cramped space, children huddled together, melancholic atmosphere"
    },
    "张公公府邸": {
        "desc_template": "清遗太监张公公的府邸，{detail}阴森华丽的厅堂里挂满暗红色帷幔，檀香缭绕中透着腐朽的气息。{action_desc}古董摆件在烛光下泛着幽光，让人不寒而栗。",
        "details": ["雕花红木太师椅上坐着白面无须的老太监，阴鸷的目光打量着来人。", "四壁挂着宫廷字画，却在岁月中显出颓败之相。", "角落里站着几个面无表情的仆人，整个府邸静得可怕。"],
        "en_base": "Qing dynasty eunuch's mansion, dark crimson drapes, incense smoke, antique furniture, ominous atmosphere, candlelit interior, decadent and sinister"
    },
    "名角戏园子舞台": {
        "desc_template": "北平最负盛名的戏园子，{detail}华丽的舞台上灯火辉煌，绣金帷幕徐徐拉开。{action_desc}台下座无虚席，达官贵人与平民百姓同声喝彩。",
        "details": ["追光灯将舞台中央照得恍如白昼，戏彩服饰流光溢彩。", "乐池里的胡琴声悠扬婉转，配合着台上的身段唱腔。", "包厢里的贵客品着香茗，目不转睛地注视着台上。"],
        "en_base": "1930s-1940s prestigious Peking opera theater, elaborate stage, golden embroidered curtains, spotlight illumination, packed audience, traditional orchestra, glamorous atmosphere"
    },
    "花满楼": {
        "desc_template": "北平高档青楼花满楼，{detail}红灯笼高悬，绣帘飘动，脂粉香气扑面而来。{action_desc}丝竹声中夹杂着女子的娇笑声，一派纸醉金迷的景象。",
        "details": ["雕栏玉砌的回廊里，穿着旗袍的姑娘们倚栏而立。", "二楼包间里传来推杯换盏的声音，醉客的笑声此起彼伏。", "楼下大厅中央，一位艳丽女子正在弹唱小曲。"],
        "en_base": "1930s-1940s high-class Peking courtesan house, red lanterns, embroidered curtains, perfumed air, beautiful women in qipao, luxurious interior, romantic and decadent"
    },
    "袁四爷府邸": {
        "desc_template": "京城富商袁四爷的豪宅，{detail}古玩字画满壁，红木家具精雕细琢，处处彰显着主人的品位与财力。{action_desc}",
        "details": ["书房里陈列着珍贵的戏曲手稿和名伶画像。", "客厅正中悬挂着一幅虞姬挥剑图，笔触细腻传神。", "茶几上摆着上等龙井，茶香袅袅。"],
        "en_base": "1930s-1940s wealthy merchant mansion in Beijing, antique calligraphy and paintings, rosewood furniture, refined taste, collector's study, traditional Chinese luxury"
    },
    "日军占领戏院": {
        "desc_template": "日军占领时期的戏院，{detail}舞台两侧挂着日本军旗，前排座位被日本军官占据。{action_desc}气氛紧张压抑，但台上的演员依然一丝不苟地表演着。",
        "details": ["穿着军服的日本军官正襟危坐，目光专注地看着台上。", "后台的演员们战战兢兢，不知命运几何。", "观众席上的中国人低着头，不敢与日本人对视。"],
        "en_base": "1940s Peking opera theater under Japanese occupation, Japanese military flags, Japanese officers in audience, tense atmosphere, performers on stage, occupied territory"
    },
    "国军驻地": {
        "desc_template": "1945年后的国军驻地，{detail}军营帐篷杂乱无章，士兵们三三两两地喝酒赌钱。{action_desc}空气中弥漫着烟草和汗臭味，秩序混乱。",
        "details": ["粗犷的士兵们吆五喝六，对着表演的艺人指指点点。", "角落里堆放着抢来的物资，有人正在分赃。", "一面青天白日旗在风中无力地飘动。"],
        "en_base": "1945-1949 Nationalist Army camp, chaotic military tents, undisciplined soldiers, drinking and gambling, disorderly atmosphere, post-war chaos"
    },
    "批斗会场": {
        "desc_template": "文革时期的批斗会场，{detail}红色标语铺天盖地，高台上站着被批斗者，头戴高帽，胸挂木牌。{action_desc}",
        "details": ["台下是黑压压的人群，高举拳头齐声呐喊口号。", "红卫兵们挥舞着红宝书，脸上是狂热的表情。", "扩音喇叭里传出尖锐刺耳的批判声。"],
        "en_base": "Cultural Revolution struggle session, red propaganda banners, accused wearing dunce cap and placard, frenzied crowd, Red Guards, harsh interrogation lighting, political persecution"
    },
    "段小楼家": {
        "desc_template": "段小楼与菊仙的家，{detail}普通的四合院民居，{period_detail}{action_desc}",
        "details": ["堂屋里摆着简朴的八仙桌，墙上挂着霸王的戏装照。", "菊仙正在灶台前忙碌，烟火气十足。", "院子里晾着洗好的衣服，几只鸡在地上觅食。"],
        "period_details": {
            "成名期": "家具虽不奢华但整洁温馨，菊仙的嫁妆红柜格外醒目。",
            "抗战后期": "家中显出战乱的凋敝，但菊仙依然尽力维持着体面。",
            "建国后": "墙上贴着学习标语，家具变得更加简朴。",
            "文革浩劫": "屋内被抄家后凌乱不堪，物品散落一地，满目疮痍。"
        },
        "en_base": "Traditional Beijing courtyard house, simple furniture, domestic atmosphere, working-class home"
    },
    "鸦片烟馆": {
        "desc_template": "北平的鸦片烟馆，{detail}烟雾缭绕的昏暗空间里，躺满了神情恍惚的瘾君子。{action_desc}",
        "details": ["雕花烟榻上躺着几个形容枯槁的人，手持烟枪吞云吐雾。", "墙壁上沾满了烟渍，空气污浊到令人窒息。", "角落里有人在低声呻吟，也有人在迷幻中喃喃自语。"],
        "en_base": "1940s-1950s opium den, smoke-filled room, reclining addicts, ornate opium pipes, dark and hazy atmosphere, decadence and decay"
    },
    "医院戒毒室": {
        "desc_template": "简陋的戒毒病房，{detail}白色的墙壁，铁架病床，刺鼻的消毒水味。{action_desc}",
        "details": ["病人被皮带绑在床上，痛苦地扭动挣扎。", "护士冷漠地记录着病人的状况，医生匆匆查房而过。", "窗外是刺眼的阳光，与室内的阴暗形成对比。"],
        "en_base": "1950s hospital detox ward, white walls, iron beds, sterile environment, patient in withdrawal agony, harsh medical atmosphere"
    }
}

# 角色详细配置
CHARACTERS = {
    "程蝶衣": {
        "appearance_young": "年轻的程蝶衣，眉目如画，面若桃花，身段婀娜，一颦一笑皆是风情。虞姬戏装在身，凤冠霞帔，流光溢彩，雌雄莫辨的绝世容颜。",
        "appearance_middle": "中年程蝶衣，容颜依旧俊美，却多了几分沧桑与执念。眼神时而迷离时而清亮，人戏不分的气质愈发浓郁。",
        "appearance_old": "1977年的程蝶衣，虽已年过半百，但扮上虞姬的妆容依然令人惊艳。岁月在脸上留下痕迹，却无法磨灭那份骨子里的妩媚。",
        "en_appearance": "Cheng Dieyi played by Leslie Cheung, ethereal androgynous beauty, feminine grace, porcelain skin, expressive eyes, Peking opera dan role performer",
        "emotions": {
            "痴情": ("眼波流转中满是深情，嘴角含着若有若无的微笑，整个人散发着缱绻的气息", "lovestruck gaze, subtle smile, yearning expression"),
            "绝望": ("双眸中的光芒骤然熄灭，脸色苍白如纸，嘴唇微微颤抖，整个人仿佛被抽空了灵魂", "devastated expression, hollow eyes, trembling lips, drained of life"),
            "偏执": ("眼神中燃烧着近乎疯狂的执念，下颌微扬，神情决绝，不容任何人质疑", "obsessive intensity in eyes, defiant chin, unwavering determination"),
            "梦幻": ("眼神迷离恍惚，仿佛沉浸在另一个世界，嘴角挂着不属于这个时代的笑容", "dreamy faraway look, ethereal smile, lost in another world"),
            "决绝": ("目光坚定如铁，面容平静却透着一股凛然之气，已然做好了最后的选择", "resolute gaze, calm but determined, accepting fate"),
            "凄美": ("泪光盈盈却强忍不落，红唇微启欲说还休，美得让人心碎", "glistening tears held back, parted red lips, heartbreaking beauty")
        }
    },
    "段小楼": {
        "appearance_young": "年轻的段小楼，身材魁梧，方脸浓眉，英气勃勃。霸王戏装在身，黑白脸谱威风凛凛，举手投足间尽显王者霸气。",
        "appearance_middle": "中年段小楼，身形依旧壮硕，但眉宇间多了几分沧桑与无奈。在现实与理想之间艰难抉择的痕迹清晰可见。",
        "appearance_old": "1977年的段小楼，发鬓斑白，身形佝偻，当年的霸王气概已被岁月消磨，只剩下疲惫与悔恨。",
        "en_appearance": "Duan Xiaolou played by Zhang Fengyi, masculine and broad-shouldered, strong jawline, martial bearing, Peking opera sheng role performer",
        "emotions": {
            "豪爽": ("爽朗大笑，眼中闪烁着豪迈的光芒，大手一挥尽显义气", "hearty laughter, bold glint in eyes, generous gesture"),
            "愧疚": ("眼神躲闪，眉头紧锁，嘴角下垂，整个人被负罪感压得喘不过气", "averted gaze, furrowed brow, downturned mouth, burdened by guilt"),
            "挣扎": ("面部肌肉紧绷，眼神在坚定与妥协之间摇摆，内心的矛盾几乎要将他撕裂", "tense facial muscles, wavering eyes, inner conflict visible"),
            "悔恨": ("双眼通红，面容扭曲，多年来的后悔在这一刻如潮水般涌来", "reddened eyes, anguished expression, overwhelming regret"),
            "震惊": ("瞳孔骤然放大，嘴唇微张，整个人僵在原地无法动弹", "dilated pupils, mouth agape, frozen in shock")
        }
    },
    "菊仙": {
        "appearance": "菊仙，花满楼的头牌，身姿窈窕，面容娇艳，一双凤眼顾盼生辉。虽出身风尘，却有着不输大家闺秀的气度与刚烈。",
        "en_appearance": "Juxian played by Gong Li, stunning beauty, sharp phoenix eyes, elegant qipao, former courtesan, fierce and proud",
        "emotions": {
            "泼辣": ("杏眼圆睁，柳眉倒竖，言辞犀利，寸步不让的气势", "wide almond eyes, raised eyebrows, sharp words, unyielding stance"),
            "深爱": ("眼中满是柔情，嘴角含笑，整个人都因爱而发光", "tender loving gaze, gentle smile, radiant with love"),
            "嫉妒": ("眼神锐利如刀，嘴角微微抽动，表面平静下暗流涌动", "sharp jealous glare, twitching lips, barely concealed envy"),
            "绝望": ("双眼失去焦距，面容呆滞，仿佛灵魂已经离开了躯壳", "unfocused eyes, blank expression, soul already departed")
        }
    },
    "小豆子": {
        "appearance": "童年的小豆子，清秀瘦弱，大眼睛里满是惊恐与渴望。细长的手指上残留着断指的伤疤，却无法掩盖那与生俱来的旦角天分。",
        "en_appearance": "Young Douzi, delicate and thin child, large fearful eyes, androgynous features, scarred finger, natural grace for dan role"
    },
    "小石头": {
        "appearance": "童年的小石头，结实敦厚，方脸大眼，天生一副武生的好底子。性格豪爽仗义，是小豆子的保护者。",
        "en_appearance": "Young Shitou, sturdy and strong child, square face, bold eyes, natural warrior bearing, protective stance"
    },
    "关师傅": {
        "appearance": "关师傅，戏班班主，花甲之年，面容严厉，眼神犀利。一把戒尺从不离手，是学徒们又敬又畏的存在。",
        "en_appearance": "Master Guan, elderly opera school master, stern face, piercing eyes, holding a ruler, authoritative presence"
    },
    "袁四爷": {
        "appearance": "袁四爷，京城富商，风度翩翩，长袍马褂裁剪考究。眼神中透着精明与风雅，是真正懂戏的票友。",
        "en_appearance": "Master Yuan played by Ge You, wealthy patron, refined gentleman, elegant traditional robe, discerning connoisseur"
    },
    "艳红": {
        "appearance": "艳红，小豆子的母亲，窑姐出身，浓妆艳抹难掩风尘气息，但眼中偶尔闪过的母爱令人心酸。",
        "en_appearance": "Yanhong, Douzi's mother, aging prostitute, heavy makeup, hardened face with occasional maternal tenderness"
    }
}

# 镜头类型配置
SHOT_TYPES = {
    "特写": {"cn": "特写镜头，将{subject}完全充满画面", "en": "extreme close-up"},
    "近景": {"cn": "近景镜头，框取{subject}的面部和肩部", "en": "close-up shot"},
    "中景": {"cn": "中景镜头，呈现{subject}的腰部以上", "en": "medium shot"},
    "全景": {"cn": "全景镜头，完整展现{subject}的全身及周围环境", "en": "full shot"},
    "大全景": {"cn": "大全景镜头，宏观展现整个场景空间", "en": "wide establishing shot"},
    "过肩镜头": {"cn": "过肩镜头，从{subject2}的肩膀后方拍摄{subject}", "en": "over-the-shoulder shot"},
    "主观镜头": {"cn": "主观视角镜头，模拟{subject}的第一人称视点", "en": "POV shot"},
    "俯拍": {"cn": "俯拍镜头，从上方俯视{subject}", "en": "high angle shot"},
    "仰拍": {"cn": "仰拍镜头，从低角度仰视{subject}，赋予其威严感", "en": "low angle shot"}
}

# 镜头运动配置
CAMERA_MOVES = {
    "固定": {"cn": "固定机位，静止凝视", "en": "static shot, locked camera"},
    "推进": {"cn": "缓缓向前推进", "en": "slow push in, dolly forward"},
    "拉远": {"cn": "逐渐后拉远离主体", "en": "pull back, dolly out"},
    "横移": {"cn": "平稳横向移动", "en": "lateral tracking shot"},
    "跟拍": {"cn": "跟随主体移动", "en": "following shot, tracking"},
    "环绕": {"cn": "360度环绕主体运动", "en": "orbiting camera movement"},
    "升降": {"cn": "垂直升降运动", "en": "crane shot, vertical movement"},
    "手持晃动": {"cn": "手持摄影，轻微晃动增加临场感", "en": "handheld, subtle shake"},
    "斯坦尼康": {"cn": "斯坦尼康稳定器，流畅平稳地移动", "en": "steadicam, smooth gliding movement"}
}

# 剧情分集大纲（保持与之前一致，但只列出关键场景）
EPISODE_OUTLINES = [
    # 第一幕：梨园春秋 (1-30集)
    {"ep": 1, "title": "1977年重逢", "scene": "1977年闲置剧院", "chars": ["程蝶衣", "段小楼"], 
     "key_moments": ["二人步入尘封剧院", "岁月沧桑的对视", "\"二十一年\"\"二十二年\"的对白"]},
    {"ep": 2, "title": "窑姐艳红", "scene": "北平庙会", "chars": ["艳红", "小豆子"],
     "key_moments": ["庙会的喧嚣热闹", "小豆子被人嘲笑六指", "艳红眼中的无奈"]},
    {"ep": 3, "title": "断指入科", "scene": "关家科班练功房", "chars": ["艳红", "小豆子", "关师傅"],
     "key_moments": ["艳红狠心切指", "血染白布", "关师傅收徒"]},
    {"ep": 4, "title": "初入科班", "scene": "关家科班练功房", "chars": ["小豆子", "小石头", "关师傅"],
     "key_moments": ["第一次见小石头", "被孤立欺负", "小石头的保护"]},
    {"ep": 5, "title": "苦练开始", "scene": "关家科班练功房", "chars": ["小豆子", "小石头", "关师傅"],
     "key_moments": ["压腿劈叉的痛苦", "师傅的鞭打", "\"要想人前显贵，必得人后受罪\""]},
    {"ep": 6, "title": "小石头的保护", "scene": "科班宿舍", "chars": ["小豆子", "小石头"],
     "key_moments": ["深夜分食", "温暖的兄弟情", "黑暗中的依偎"]},
    {"ep": 7, "title": "念错戏词", "scene": "关家科班练功房", "chars": ["小豆子", "关师傅"],
     "key_moments": ["\"我本是男儿郎\"", "被打嘴巴", "倔强不改"]},
    {"ep": 8, "title": "逃跑", "scene": "北平庙会", "chars": ["小豆子", "小癞子"],
     "key_moments": ["逃出科班", "街头流浪", "迷茫的眼神"]},
    {"ep": 9, "title": "名角的启示", "scene": "名角戏园子舞台", "chars": ["小豆子", "小癞子"],
     "key_moments": ["看《霸王别姬》", "被艺术震撼", "眼中燃起光芒"]},
    {"ep": 10, "title": "回归与悲剧", "scene": "科班宿舍", "chars": ["小豆子", "小癞子", "关师傅"],
     "key_moments": ["返回科班", "小癞子的恐惧", "悬梁自尽"]},
    {"ep": 11, "title": "旦角天分", "scene": "关家科班练功房", "chars": ["小豆子", "关师傅"],
     "key_moments": ["学习旦角身段", "天生的灵气", "师傅的赞许"]},
    {"ep": 12, "title": "烟袋入口", "scene": "关家科班练功房", "chars": ["小豆子", "小石头"],
     "key_moments": ["小石头用烟袋捅嘴", "逼他念\"女娇娥\"", "血泪交织"]},
    {"ep": 13, "title": "\"我本是女娇娥\"", "scene": "关家科班练功房", "chars": ["小豆子"],
     "key_moments": ["终于念对戏词", "人戏不分的开始", "眼神的转变"]},
    {"ep": 14, "title": "虞姬初现", "scene": "关家科班练功房", "chars": ["小豆子", "小石头"],
     "key_moments": ["第一次扮演虞姬", "惊艳全场", "与小石头的默契"]},
    {"ep": 15, "title": "霸王与虞姬", "scene": "关家科班练功房", "chars": ["小豆子", "小石头"],
     "key_moments": ["首次合演《霸王别姬》", "\"说好的，一辈子\"", "纯真的承诺"]},
    {"ep": 16, "title": "张公公来访", "scene": "关家科班练功房", "chars": ["小豆子", "关师傅", "张公公"],
     "key_moments": ["张公公相中小豆子", "阴森的目光", "不祥的预感"]},
    {"ep": 17, "title": "张公公府", "scene": "张公公府邸", "chars": ["小豆子"],
     "key_moments": ["踏入豪宅", "压抑的氛围", "无处可逃"]},
    {"ep": 18, "title": "凌辱", "scene": "张公公府邸", "chars": ["小豆子"],
     "key_moments": ["童年的创伤", "无声的眼泪", "灵魂的破碎"]},
    {"ep": 19, "title": "弃婴小四", "scene": "北平庙会", "chars": ["小豆子", "小石头"],
     "key_moments": ["发现弃婴", "执意收养", "新的牵绊"]},
    {"ep": 20, "title": "师傅的接纳", "scene": "关家科班练功房", "chars": ["小豆子", "小石头", "关师傅"],
     "key_moments": ["关师傅同意收养", "温情时刻", "命运的转折"]},
    {"ep": 21, "title": "少年成长", "scene": "关家科班练功房", "chars": ["小豆子", "小石头"],
     "key_moments": ["技艺精进", "形影不离", "青春年华"]},
    {"ep": 22, "title": "关师傅的期望", "scene": "关家科班练功房", "chars": ["小豆子", "小石头", "关师傅"],
     "key_moments": ["师傅寄予厚望", "\"人，得自个儿成全自个儿\"", "即将出师"]},
    {"ep": 23, "title": "最后的训练", "scene": "关家科班练功房", "chars": ["小豆子", "小石头"],
     "key_moments": ["高强度训练", "汗水与泪水", "蜕变前夜"]},
    {"ep": 24, "title": "出师之日", "scene": "关家科班练功房", "chars": ["小豆子", "小石头", "关师傅"],
     "key_moments": ["离开科班", "依依惜别", "走向未来"]},
    {"ep": 25, "title": "首演准备", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["进入戏园子", "紧张期待", "化妆准备"]},
    {"ep": 26, "title": "首演登台", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["正式登台", "一鸣惊人", "观众喝彩"]},
    {"ep": 27, "title": "观众反响", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["演出成功", "掌声雷动", "后台庆祝"]},
    {"ep": 28, "title": "艺名诞生", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["取艺名", "程蝶衣、段小楼", "名角之路"]},
    {"ep": 29, "title": "渐露头角", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["多场演出", "口碑渐起", "戏迷追捧"]},
    {"ep": 30, "title": "青春年华", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["事业起步", "形影不离", "理想与承诺"]},
    
    # 第二幕：成名与纠葛 (31-50集)
    {"ep": 31, "title": "名角风范", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["万人空巷", "名震京师", "\"程老板\"\"段老板\""]},
    {"ep": 32, "title": "袁四爷赏识", "scene": "袁四爷府邸", "chars": ["程蝶衣", "段小楼", "袁四爷"],
     "key_moments": ["袁四爷包场", "大加赞赏", "赠送宝剑"]},
    {"ep": 33, "title": "袁府宴请", "scene": "袁四爷府邸", "chars": ["程蝶衣", "段小楼", "袁四爷"],
     "key_moments": ["府邸宴请", "谈戏论艺", "暧昧萌生"]},
    {"ep": 34, "title": "宝剑传情", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["蝶衣赠剑", "\"霸王的剑该归霸王\"", "暗含深情"]},
    {"ep": 35, "title": "人戏不分", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["愈发入戏", "虞姬对霸王", "分不清戏与人"]},
    {"ep": 36, "title": "花满楼", "scene": "花满楼", "chars": ["段小楼", "菊仙"],
     "key_moments": ["偶入青楼", "遇见菊仙", "一见钟情"]},
    {"ep": 37, "title": "一见钟情", "scene": "花满楼", "chars": ["段小楼", "菊仙"],
     "key_moments": ["打抱不平", "英雄救美", "冲动允婚"]},
    {"ep": 38, "title": "蝶衣的震惊", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["得知婚讯", "心如刀割", "\"说好的一辈子\""]},
    {"ep": 39, "title": "针锋相对", "scene": "花满楼", "chars": ["程蝶衣", "菊仙"],
     "key_moments": ["首次相遇", "暗中较劲", "两个女人的战争"]},
    {"ep": 40, "title": "婚约", "scene": "段小楼家", "chars": ["段小楼", "菊仙", "程蝶衣"],
     "key_moments": ["正式定婚", "菊仙赎身", "蝶衣绝望"]},
    {"ep": 41, "title": "日军入城", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["日军占领", "戏园停演", "人心惶惶"]},
    {"ep": 42, "title": "段小楼惹祸", "scene": "日军占领戏院", "chars": ["段小楼"],
     "key_moments": ["冲动惹祸", "被日军关押", "生死未卜"]},
    {"ep": 43, "title": "蝶衣的抉择", "scene": "日军占领戏院", "chars": ["程蝶衣"],
     "key_moments": ["为救师兄", "决定唱戏", "委曲求全"]},
    {"ep": 44, "title": "青木军官", "scene": "日军占领戏院", "chars": ["程蝶衣"],
     "key_moments": ["为日本人演出", "青木懂戏", "艺术无国界"]},
    {"ep": 45, "title": "师兄获释", "scene": "段小楼家", "chars": ["程蝶衣", "段小楼", "菊仙"],
     "key_moments": ["段小楼获释", "误会蝶衣", "\"给日本人唱戏\""]},
    {"ep": 46, "title": "菊仙的婚礼", "scene": "段小楼家", "chars": ["段小楼", "菊仙", "程蝶衣"],
     "key_moments": ["违约成婚", "红嫁衣", "蝶衣的眼泪"]},
    {"ep": 47, "title": "投向袁四爷", "scene": "袁四爷府邸", "chars": ["程蝶衣", "袁四爷"],
     "key_moments": ["绝望投奔", "开始关系", "\"戏里的人\""]},
    {"ep": 48, "title": "师傅重逢", "scene": "关家科班练功房", "chars": ["程蝶衣", "段小楼", "关师傅"],
     "key_moments": ["师傅病重", "教训和好", "\"霸王和虞姬不能散\""]},
    {"ep": 49, "title": "师傅离世", "scene": "关家科班练功房", "chars": ["程蝶衣", "段小楼", "关师傅"],
     "key_moments": ["师傅猝死", "跪送恩师", "师恩难忘"]},
    {"ep": 50, "title": "重归于好", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["为师傅合作", "再演《霸王别姬》", "暂时和解"]},
    
    # 第三幕：乱世沉浮 (51-65集)
    {"ep": 51, "title": "日本投降", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["举国欢庆", "但动荡未平", "何去何从"]},
    {"ep": 52, "title": "国军入城", "scene": "国军驻地", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["国军接管", "军纪涣散", "乱象丛生"]},
    {"ep": 53, "title": "被迫演出", "scene": "国军驻地", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["被迫表演", "粗鲁无礼", "屈辱感"]},
    {"ep": 54, "title": "调戏与冲突", "scene": "国军驻地", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["调戏蝶衣", "\"日本人也不曾如此\"", "冲突爆发"]},
    {"ep": 55, "title": "菊仙流产", "scene": "段小楼家", "chars": ["菊仙", "段小楼", "程蝶衣"],
     "key_moments": ["菊仙被打", "不幸流产", "蝶衣被捕"]},
    {"ep": 56, "title": "汉奸罪名", "scene": "批斗会场", "chars": ["程蝶衣"],
     "key_moments": ["通敌罪名", "入狱受审", "孤独绝望"]},
    {"ep": 57, "title": "段小楼求救", "scene": "袁四爷府邸", "chars": ["段小楼", "袁四爷"],
     "key_moments": ["放下面子", "求袁四爷", "周旋营救"]},
    {"ep": 58, "title": "法庭辩护", "scene": "批斗会场", "chars": ["程蝶衣"],
     "key_moments": ["法庭自辩", "\"日本人懂戏\"", "全场哗然"]},
    {"ep": 59, "title": "名伶风骨", "scene": "批斗会场", "chars": ["程蝶衣"],
     "key_moments": ["法庭清唱", "技艺折服", "获得同情"]},
    {"ep": 60, "title": "获释出狱", "scene": "段小楼家", "chars": ["程蝶衣", "段小楼", "菊仙"],
     "key_moments": ["高官释放", "师兄迎接", "劫后余生"]},
    {"ep": 61, "title": "政权更迭", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["共产党接管", "一切要变", "戏曲边缘"]},
    {"ep": 62, "title": "失落与空虚", "scene": "鸦片烟馆", "chars": ["程蝶衣"],
     "key_moments": ["观众骤减", "被时代抛弃", "接触鸦片"]},
    {"ep": 63, "title": "鸦片沉沦", "scene": "鸦片烟馆", "chars": ["程蝶衣"],
     "key_moments": ["沉迷鸦片", "精神恍惚", "嗓音日差"]},
    {"ep": 64, "title": "演出破嗓", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["重要演出", "突然破嗓", "名誉受损"]},
    {"ep": 65, "title": "段小楼的担忧", "scene": "段小楼家", "chars": ["程蝶衣", "段小楼", "菊仙"],
     "key_moments": ["发现吸毒", "痛心不已", "决心戒毒"]},
    
    # 第四幕：建国后 (66-80集)
    {"ep": 66, "title": "袁四爷被捕", "scene": "批斗会场", "chars": ["袁四爷"],
     "key_moments": ["反革命罪", "公审批斗", "昔日权贵"]},
    {"ep": 67, "title": "袁四爷之死", "scene": "批斗会场", "chars": ["袁四爷", "程蝶衣"],
     "key_moments": ["批斗致死", "远处目睹", "兔死狐悲"]},
    {"ep": 68, "title": "戒毒开始", "scene": "医院戒毒室", "chars": ["程蝶衣", "段小楼", "菊仙"],
     "key_moments": ["帮助戒毒", "痛苦难耐", "咬紧牙关"]},
    {"ep": 69, "title": "戒毒煎熬", "scene": "医院戒毒室", "chars": ["程蝶衣", "段小楼", "菊仙"],
     "key_moments": ["戒断反应", "几近崩溃", "菊仙照料"]},
    {"ep": 70, "title": "重获新生", "scene": "段小楼家", "chars": ["程蝶衣", "段小楼", "菊仙"],
     "key_moments": ["戒毒成功", "恢复演出", "态度转变"]},
    {"ep": 71, "title": "小四成长", "scene": "名角戏园子舞台", "chars": ["程蝶衣"],
     "key_moments": ["小四长大", "学习新戏", "传统异议"]},
    {"ep": 72, "title": "新旧冲突", "scene": "名角戏园子舞台", "chars": ["程蝶衣"],
     "key_moments": ["改变传统", "强烈反对", "\"戏不能改\""]},
    {"ep": 73, "title": "虞姬之争", "scene": "名角戏园子舞台", "chars": ["程蝶衣"],
     "key_moments": ["争夺虞姬", "蝶衣不让", "矛盾激化"]},
    {"ep": 74, "title": "段小楼罢演", "scene": "名角戏园子舞台", "chars": ["段小楼", "程蝶衣"],
     "key_moments": ["为蝶衣罢演", "不与小四合作", "义气深重"]},
    {"ep": 75, "title": "蝶衣的牺牲", "scene": "名角戏园子舞台", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["劝师兄演出", "自己断交", "\"我不演了\""]},
    {"ep": 76, "title": "风雨欲来", "scene": "段小楼家", "chars": ["程蝶衣", "段小楼", "菊仙"],
     "key_moments": ["文革开始", "大字报满街", "人人自危"]},
    {"ep": 77, "title": "焚毁戏服", "scene": "段小楼家", "chars": ["段小楼", "菊仙"],
     "key_moments": ["烧毁道具", "菊仙痛哭", "\"留着是祸\""]},
    {"ep": 78, "title": "小四检举", "scene": "批斗会场", "chars": ["程蝶衣"],
     "key_moments": ["小四检举", "历史旧账", "恩将仇报"]},
    {"ep": 79, "title": "段小楼被揪", "scene": "批斗会场", "chars": ["段小楼", "菊仙"],
     "key_moments": ["红卫兵抄家", "拉去批斗", "菊仙绝望"]},
    {"ep": 80, "title": "蝶衣的决定", "scene": "1977年闲置剧院", "chars": ["程蝶衣"],
     "key_moments": ["得知被批斗", "穿戏服前往", "\"我陪他\""]},
    
    # 第五幕：文革浩劫与终章 (81-100集)
    {"ep": 81, "title": "虞姬登场", "scene": "批斗会场", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["虞姬装扮出现", "全场震惊", "同受辱"]},
    {"ep": 82, "title": "逼迫揭发", "scene": "批斗会场", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["逼迫互揭", "\"交代问题\"", "气氛紧张"]},
    {"ep": 83, "title": "段小楼的背叛", "scene": "批斗会场", "chars": ["段小楼", "程蝶衣", "菊仙"],
     "key_moments": ["为保菊仙", "诬陷蝶衣", "\"做了四年的妾\""]},
    {"ep": 84, "title": "蝶衣的崩溃", "scene": "批斗会场", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["心碎崩溃", "\"你们都是骗我的\"", "痛不欲生"]},
    {"ep": 85, "title": "蝶衣反击", "scene": "批斗会场", "chars": ["程蝶衣", "菊仙"],
     "key_moments": ["揭露菊仙", "\"花满楼的窑姐\"", "菊仙绝望"]},
    {"ep": 86, "title": "段小楼的抉择", "scene": "批斗会场", "chars": ["段小楼", "菊仙"],
     "key_moments": ["被迫表态", "划清界线", "菊仙心死"]},
    {"ep": 87, "title": "菊仙的绝望", "scene": "段小楼家", "chars": ["菊仙"],
     "key_moments": ["万念俱灰", "回到凌乱的家", "回忆往事"]},
    {"ep": 88, "title": "红嫁衣", "scene": "段小楼家", "chars": ["菊仙"],
     "key_moments": ["穿上嫁衣", "环顾四周", "决绝眼神"]},
    {"ep": 89, "title": "菊仙自杀", "scene": "段小楼家", "chars": ["菊仙"],
     "key_moments": ["上吊自杀", "红嫁衣飘动", "香消玉殒"]},
    {"ep": 90, "title": "段小楼的悔恨", "scene": "段小楼家", "chars": ["段小楼"],
     "key_moments": ["得知死讯", "痛不欲生", "彻底崩溃"]},
    {"ep": 91, "title": "小四的下场", "scene": "批斗会场", "chars": ["程蝶衣"],
     "key_moments": ["小四被检举", "遭到批斗", "因果报应"]},
    {"ep": 92, "title": "漫长岁月", "scene": "1977年闲置剧院", "chars": ["程蝶衣"],
     "key_moments": ["十年浩劫", "独自度日", "等待黎明"]},
    {"ep": 93, "title": "段小楼的沉沦", "scene": "段小楼家", "chars": ["段小楼"],
     "key_moments": ["失去一切", "酗酒度日", "形同废人"]},
    {"ep": 94, "title": "动乱结束", "scene": "1977年闲置剧院", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["文革结束", "劫后余生", "渐复生机"]},
    {"ep": 95, "title": "重逢的消息", "scene": "1977年闲置剧院", "chars": ["程蝶衣"],
     "key_moments": ["重新演出邀请", "师兄会来", "百感交集"]},
    {"ep": 96, "title": "二十二年后", "scene": "1977年闲置剧院", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["步入剧院", "物是人非", "\"二十二年\""]},
    {"ep": 97, "title": "最后的排练", "scene": "1977年闲置剧院", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["空旷排练", "动作生疏", "默契犹在"]},
    {"ep": 98, "title": "最后一曲", "scene": "1977年闲置剧院", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["再演霸王别姬", "最后一舞", "往事如烟"]},
    {"ep": 99, "title": "男儿郎", "scene": "1977年闲置剧院", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["又念错词", "\"你是男儿郎\"", "恍然大悟"]},
    {"ep": 100, "title": "从一而终", "scene": "1977年闲置剧院", "chars": ["程蝶衣", "段小楼"],
     "key_moments": ["蝶衣梦醒", "宝剑自刎", "\"小豆子...\"", "从一而终"]}
]


def get_time_period(episode):
    """获取集数对应的时代"""
    for period, config in TIME_PERIODS.items():
        if config["episodes"][0] <= episode <= config["episodes"][1]:
            return period, config
    return "民国初年", TIME_PERIODS["民国初年"]


def generate_scene_description(scene_name, char_info, action, period_config, detail_idx=0):
    """生成200-300字的详细中文场景描写"""
    if scene_name not in SCENES:
        return f"场景：{scene_name}。{char_info}。{action}。"
    
    scene = SCENES[scene_name]
    template = scene["desc_template"]
    details = scene.get("details", [""])
    detail = details[detail_idx % len(details)]
    
    # 处理时间描述
    time_desc = ""
    if "time_descs" in scene:
        time_desc = random.choice(scene["time_descs"])
    
    # 处理时期相关描述
    period_detail = ""
    if "period_details" in scene:
        period_name, _ = get_time_period(1)  # 默认
        for p_name in scene["period_details"]:
            if p_name in str(period_config):
                period_detail = scene["period_details"][p_name]
                break
    
    # 构建描述
    desc = template.format(
        detail=detail,
        time_desc=time_desc if time_desc else "某个寻常的日子",
        action_desc=action if action else "",
        period_detail=period_detail if period_detail else ""
    )
    
    # 添加氛围
    desc += f"整个场景笼罩在{period_config['color_cn']}的色调中，{period_config['lighting_cn']}营造出{period_config['mood_cn']}的氛围。"
    
    return desc


def generate_video_description(shot_type, camera_move, duration, char_name, action, rhythm):
    """生成镜头运动、时长、节奏描述"""
    shot_info = SHOT_TYPES.get(shot_type, {"cn": shot_type})
    camera_info = CAMERA_MOVES.get(camera_move, {"cn": camera_move})
    
    subject = char_name if char_name else "主体"
    
    desc = f"镜头以{shot_info['cn'].format(subject=subject, subject2='另一角色')}"
    desc += f"，{camera_info['cn']}。"
    desc += f"整个镜头时长{duration}秒，"
    
    if duration < 3:
        desc += "节奏紧凑急促，"
    elif duration < 5:
        desc += "节奏适中流畅，"
    else:
        desc += "节奏缓慢沉稳，"
    
    desc += f"{rhythm}。"
    desc += f"剪辑点建议：在{action}动作的高潮或情绪转折处切换。"
    
    return desc


def generate_image_prompt(scene_name, char_name, char_emotion, action, period_config, shot_type):
    """生成完整的英文Image Prompt"""
    parts = []
    
    # 场景基础
    if scene_name in SCENES:
        parts.append(SCENES[scene_name]["en_base"])
    else:
        parts.append(scene_name)
    
    # 角色描述
    if char_name and char_name in CHARACTERS:
        char = CHARACTERS[char_name]
        if "en_appearance" in char:
            parts.append(char["en_appearance"])
        if char_emotion and "emotions" in char and char_emotion in char["emotions"]:
            _, en_emotion = char["emotions"][char_emotion]
            parts.append(en_emotion)
    
    # 动作
    if action:
        parts.append(action)
    
    # 镜头类型
    shot_info = SHOT_TYPES.get(shot_type, {"en": shot_type})
    parts.append(shot_info["en"])
    
    # 时代色彩和灯光
    parts.append(period_config["color_en"])
    parts.append(period_config["lighting_en"])
    
    # 技术参数
    parts.extend([
        "cinematography by Gu Changwei",
        "Chen Kaige film aesthetic",
        "Peking opera visual elements",
        "1990s Chinese cinema",
        "dramatic lighting",
        "film grain",
        "8K",
        "masterpiece",
        "photorealistic"
    ])
    
    prompt = ", ".join(parts)
    prompt += f" --ar 16:9 --sref {period_config['sref']}"
    
    return prompt


def generate_video_prompt(scene_name, char_name, action, shot_type, camera_move, period_config):
    """生成Video Prompt"""
    shot_info = SHOT_TYPES.get(shot_type, {"en": shot_type})
    camera_info = CAMERA_MOVES.get(camera_move, {"en": camera_move})
    
    parts = [
        f"Cinematic {shot_info['en']}",
        camera_info["en"],
        period_config["lighting_en"],
        period_config["mood_en"],
    ]
    
    if char_name and char_name in CHARACTERS:
        char = CHARACTERS[char_name]
        if "en_appearance" in char:
            parts.append(char["en_appearance"])
    
    if scene_name in SCENES:
        parts.append(SCENES[scene_name]["en_base"])
    
    parts.extend([
        "smooth camera movement",
        "professional cinematography",
        "film grain texture",
        "dramatic atmosphere"
    ])
    
    return ", ".join(parts)


def generate_storyboard():
    """生成3000镜头的JSON分镜表"""
    shots = []
    
    # 动作词库
    actions_cn = {
        "程蝶衣": ["轻提衣袖", "凝视远方", "缓缓转身", "低眉敛目", "举手投足尽显柔媚", "水袖轻舞", "侧首凝思", "含泪回望"],
        "段小楼": ["大步流星", "抱拳拱手", "挺胸抬头", "目光如炬", "虎背熊腰站立", "一挥手臂", "扶剑而立", "豪迈转身"],
        "菊仙": ["倚门而立", "巧笑嫣然", "凤眼微眯", "双手叉腰", "娇嗔回眸", "整理衣襟", "款款而行"],
        "小豆子": ["瑟瑟发抖", "仰头望去", "紧握拳头", "踮脚努力", "泪眼朦胧", "咬紧嘴唇"],
        "小石头": ["挺身而出", "伸手护住", "目光坚定", "用力握拳", "昂首挺胸"],
        "关师傅": ["手持戒尺", "目光严厉", "缓缓踱步", "抬手示意", "皱眉审视"],
        "default": ["静静伫立", "缓步前行", "驻足观望", "若有所思", "悄然回首"]
    }
    
    actions_en = {
        "程蝶衣": ["gracefully lifting sleeve", "gazing into distance", "slowly turning", "lowering eyes demurely", "elegant feminine gestures", "dancing with water sleeves"],
        "段小楼": ["striding forward", "making a fist salute", "standing tall", "piercing gaze", "powerful stance", "sweeping arm gesture"],
        "菊仙": ["leaning against doorframe", "charming smile", "narrowing phoenix eyes", "hands on hips", "coquettish glance"],
        "小豆子": ["trembling with fear", "looking up", "clenching fists", "standing on tiptoes", "tearful eyes"],
        "小石头": ["stepping forward protectively", "shielding with outstretched hand", "determined gaze", "clenched fists"],
        "关师傅": ["holding ruler", "stern gaze", "pacing slowly", "raising hand to signal"],
        "default": ["standing still", "walking slowly", "pausing to observe", "lost in thought"]
    }
    
    rhythms = [
        "配合人物内心的挣扎与矛盾",
        "营造紧张压抑的戏剧张力",
        "传达深沉的情感厚度",
        "呈现历史的沧桑质感",
        "表现命运的无常与无奈",
        "突出人物的孤独与坚守",
        "烘托场景的悲凉氛围",
        "强调时代的荒诞与残酷"
    ]
    
    for outline in EPISODE_OUTLINES:
        ep = outline["ep"]
        period_name, period_config = get_time_period(ep)
        scene_name = outline["scene"]
        chars = outline["chars"]
        key_moments = outline["key_moments"]
        
        # 每集30个镜头
        for shot_num in range(1, 31):
            shot_id = f"E{ep:03d}_S{shot_num:03d}"
            
            # 选择角色
            char_name = chars[shot_num % len(chars)] if chars else ""
            
            # 选择情绪
            char_emotion = ""
            if char_name in CHARACTERS:
                char = CHARACTERS[char_name]
                if "emotions" in char:
                    emotions = list(char["emotions"].keys())
                    char_emotion = emotions[shot_num % len(emotions)]
            
            # 选择动作
            action_list_cn = actions_cn.get(char_name, actions_cn["default"])
            action_list_en = actions_en.get(char_name, actions_en["default"])
            action_cn = action_list_cn[shot_num % len(action_list_cn)]
            action_en = action_list_en[shot_num % len(action_list_en)]
            
            # 关键时刻
            key_moment = key_moments[shot_num % len(key_moments)]
            
            # 镜头类型和运动
            shot_type = list(SHOT_TYPES.keys())[shot_num % len(SHOT_TYPES)]
            camera_move = list(CAMERA_MOVES.keys())[shot_num % len(CAMERA_MOVES)]
            
            # 时长
            duration = round(random.uniform(3.0, 8.0), 1)
            
            # 节奏
            rhythm = rhythms[shot_num % len(rhythms)]
            
            # 生成角色情绪描述
            char_emotion_cn = ""
            if char_name in CHARACTERS and "emotions" in CHARACTERS[char_name]:
                if char_emotion in CHARACTERS[char_name]["emotions"]:
                    char_emotion_cn, _ = CHARACTERS[char_name]["emotions"][char_emotion]
            
            char_info = f"{char_name}{char_emotion_cn}" if char_emotion_cn else char_name
            action_with_moment = f"{action_cn}，{key_moment}"
            
            # 生成各项描述
            画面描述 = generate_scene_description(
                scene_name, char_info, action_with_moment, period_config, shot_num
            )
            
            视频描述 = generate_video_description(
                shot_type, camera_move, duration, char_name, action_cn, rhythm
            )
            
            image_prompt = generate_image_prompt(
                scene_name, char_name, char_emotion, action_en, period_config, shot_type
            )
            
            video_prompt = generate_video_prompt(
                scene_name, char_name, action_en, shot_type, camera_move, period_config
            )
            
            shot = {
                "shot_id": shot_id,
                "episode": ep,
                "shot_number": shot_num,
                "title": outline["title"],
                "time_period": f"{period_name} ({period_config['years']})",
                "duration_seconds": duration,
                "character": char_name,
                "emotion": char_emotion,
                "画面描述": 画面描述,
                "视频描述": 视频描述,
                "Image_Prompt": image_prompt,
                "Video_Prompt": video_prompt
            }
            
            shots.append(shot)
    
    return shots


def main():
    output_path = "/home/beerbear/.openclaw/workspace/ai_drama_studio_v2/projects/bawangbieji/pro_storyboard.json"
    
    print("正在生成《霸王别姬》专业级分镜表 (JSON格式)...")
    print("=" * 60)
    
    shots = generate_storyboard()
    
    # 写入JSON文件
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(shots, f, ensure_ascii=False, indent=2)
    
    print(f"✅ 生成完成！")
    print(f"📊 总镜头数: {len(shots)}")
    print(f"📂 保存位置: {output_path}")
    
    # 统计数据
    print("\n📈 统计数据:")
    print("-" * 40)
    
    # 按时代统计
    period_counts = {}
    for shot in shots:
        period = shot["time_period"].split(" (")[0]
        period_counts[period] = period_counts.get(period, 0) + 1
    
    for period, count in period_counts.items():
        print(f"  {period}: {count} 镜头")
    
    # 按角色统计
    char_counts = {}
    for shot in shots:
        char = shot["character"]
        if char:
            char_counts[char] = char_counts.get(char, 0) + 1
    
    print("\n🎭 主要角色镜头统计:")
    for char, count in sorted(char_counts.items(), key=lambda x: -x[1])[:8]:
        print(f"  {char}: {count} 镜头")
    
    # 总时长估算
    total_duration = sum(shot["duration_seconds"] for shot in shots)
    print(f"\n⏱️ 预估总时长: {total_duration/60:.1f} 分钟")
    
    # 打印示例
    print("\n📝 示例镜头:")
    print("-" * 40)
    sample = shots[0]
    print(json.dumps(sample, ensure_ascii=False, indent=2))
    
    return len(shots)


if __name__ == "__main__":
    main()
