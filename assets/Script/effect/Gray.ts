const { ccclass, property } = cc._decorator;

@ccclass
export default class Gray extends cc.Component {
    @property(cc.Sprite) sprite: cc.Sprite = null;
    @property(cc.Label) tips: cc.Label = null;
    
    start() {
        this.setGray(0.5);
    }

    setGray(grayLevel) {
        const sprite = this.sprite;
        // 获取渲染组件的材质
        let material: cc.Material = sprite.getMaterial(0);
        // 给材质的 uniform 变量跟新值
        // let grayLevel: number = 1.0;  // [0.0, 1.0]
        material.setProperty("grayLevel", grayLevel);
        // 重新将材质设置回去
        sprite.setMaterial(0, material);
        
        this.setStr(grayLevel);
    }
    setStr(grayLevel) {
        this.tips.string = '灰化程度：' + grayLevel.toFixed(2);
    }
    onSlider(slider) {
        var grayLevel = slider.progress;
        this.setGray(grayLevel);
    }
}
