# 🐛 角色设计模块 - 10个问题诊断

## 问题清单

### 问题1: ❌ extractCharacters()硬编码
**严重程度**: 🔴 高
**位置**: 前端 ~line 2645
**问题**: 函数返回硬编码的"小猴子"角色，完全忽略AI结果
```javascript
function extractCharacters(){
    return {
        main: [{ name: '小猴子', ... }]  // 硬编码！
    }
}
```

### 问题2: ❌ showStep(5)逻辑冲突
**严重程度**: 🔴 高
**位置**: 前端 ~line 1077
**问题**: 当显示Step5时，如果`state.characters.main.length==0`，会调用`showAgentThinking`→`extractCharacters()`覆盖AI结果
```javascript
case 5:
    content.innerHTML = renderStep4();
    if(!state.characters?.main?.length && document.getElementById('characterThinking')){
        showAgentThinking('characterThinking', 'character', () => {
            state.characters = extractCharacters();  // 覆盖AI结果！
        });
    }
```

### 问题3: ⚠️ normalizeCharacters角色分类
**严重程度**: 🟡 中
**位置**: 前端 ~line 4200
**问题**: 只检查`c.role?.includes('主角')`，"配角"和"反派"都被分到supporting
```javascript
if(c.type === 'main' || c.role?.includes('主角') || c.is_protagonist){
    result.main.push(char);
} else {
    result.supporting.push(char);  // 配角和反派都在这里
}
```

### 问题4: ⚠️ runCharacterAgent后的跳转
**严重程度**: 🟡 中
**位置**: 前端 ~line 4054
**问题**: `setTimeout(() => showStep(5), 500)`跳转回Step5，触发问题2的条件检查
```javascript
setTimeout(() => showStep(5), 500);  // 跳转回去，可能重新触发覆盖逻辑
```

### 问题5: ⚠️ JSON解析错误处理
**严重程度**: 🟡 中
**位置**: 前端 ~line 4046
**问题**: 解析失败时静默使用原始response，可能导致意外格式
```javascript
} catch(e){ result = apiResponse; }  // 无错误日志
```

### 问题6: 🟢 relationships未使用
**严重程度**: 🟢 低
**位置**: 前端 normalizeCharacters
**问题**: API返回`relationships`数组，但前端没有存储使用

### 问题7: 🟢 角色详情字段映射
**严重程度**: 🟢 低
**位置**: normalizeOneCharacter函数
**问题**: API返回的新字段(silhouette, appearance_prompt等)未完全映射

### 问题8: ⚠️ characterThinking元素检测
**严重程度**: 🟡 中
**位置**: showStep case 5
**问题**: `document.getElementById('characterThinking')`可能在不同状态返回不同结果

### 问题9: 🟢 totalChars显示0
**严重程度**: 🟢 低 (问题1/2的后果)
**问题**: 因为问题1/2导致state.characters被覆盖为空或硬编码数据

### 问题10: ⚠️ 没有错误边界
**严重程度**: 🟡 中
**问题**: AI调用成功但后续处理失败时，用户看到"0角色"但无错误提示

---

## 根本原因

**主要问题是 showStep(5) 的条件逻辑会覆盖AI结果**

当`runCharacterAgent`完成后调用`showStep(5)`时：
1. `state.characters`已被设置为AI结果
2. 但`showStep(5)`检查`!state.characters?.main?.length`
3. 如果main数组为空(可能因为分类问题)，触发`extractCharacters()`
4. 硬编码数据覆盖AI结果

## 修复方案

1. 删除或修改`extractCharacters()`函数
2. 修改showStep(5)不要覆盖已有的AI数据
3. 改进角色分类逻辑，正确处理"主角"/"配角"/"反派"
4. 添加错误日志和调试信息
