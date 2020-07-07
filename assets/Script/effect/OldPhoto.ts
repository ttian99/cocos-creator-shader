const { ccclass, property } = cc._decorator;

@ccclass
export default class OldPhoto extends cc.Component {
    @property(cc.Sprite) sprite: cc.Sprite = null;
    @property(cc.Label) tips: cc.Label = null;
    
    start() {
        this.setOldLevel(0.5);
    }

    setOldLevel(oldLevel) {
        const sprite = this.sprite;
        // 获取渲染组件的材质
        let material: cc.Material = sprite.getMaterial(0);
        // 给材质的 uniform 变量跟新值
        // let oldLevel: number = 1.0;  // [0.0, 1.0]
        material.setProperty("oldLevel", oldLevel);
        // 重新将材质设置回去
        sprite.setMaterial(0, material);
        
        this.setStr(oldLevel);
    }
    setStr(oldLevel) {
        this.tips.string = '老化程度：' + oldLevel.toFixed(2);
    }
    onSlider(slider) {
        var oldLevel = slider.progress;
        this.setOldLevel(oldLevel);
    }
}
