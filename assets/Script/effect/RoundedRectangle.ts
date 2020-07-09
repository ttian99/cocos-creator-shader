const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode()
export default class RoundedRectangle extends cc.Component {
    @property(cc.Sprite) sprite: cc.Sprite = null;
    @property(cc.Label) tips: cc.Label = null;
    radius = 0.20;
    onLoad() {
        // 关闭动态合图
        cc.dynamicAtlasManager.enabled = false;
    }
    start() {
        this._updateMaterial();
    }
    setStr(radius) {
        this.tips.string = '圆角半径：' + radius.toFixed(2);
    }
    onSlider(slider) {
        this.radius = slider.progress;
        this.setStr(this.radius);
        this._updateMaterial();
    }

    /**
     * 更新材质
     * - 获取渲染组件的材质
     * - 给材质的 uniform 变量跟新值
     * - 重新将材质设置回去
     * */
    _updateMaterial() {
        const radius = this.radius;
        // const sprite = this.node.getComponent(cc.Sprite);
        console.log('radius = ' + radius);
        const sprite = this.sprite;
        let material: cc.Material = sprite.getMaterial(0);
        material.setProperty("radius", radius);
        sprite.setMaterial(0, material);
    }
}
