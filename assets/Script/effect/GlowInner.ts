const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode()
export default class GlowInner extends cc.Component {
    @property(cc.Sprite) sprite: cc.Sprite = null;
    @property(cc.Slider) glowColorSizeSlider: cc.Slider = null;
    @property(cc.Slider) glowThresholdSlider: cc.Slider = null;
    @property(cc.Slider) colorRSlider: cc.Slider = null;
    @property(cc.Slider) colorGSlider: cc.Slider = null;
    @property(cc.Slider) colorBSlider: cc.Slider = null;
    @property(cc.Slider) colorASlider: cc.Slider = null;
    @property(cc.Label) glowThreshold: cc.Label = null;
    @property(cc.Label) glowColorSize: cc.Label = null;
    @property(cc.Label) colorR: cc.Label = null;
    @property(cc.Label) colorG: cc.Label = null;
    @property(cc.Label) colorB: cc.Label = null;
    @property(cc.Label) colorA: cc.Label = null;

    maxTreshold = 1.00; // 发光阈值最大值
    maxColorSize = 0.100; // 发光宽度最大值

    start() {
        this._updateGlow();
    }

    _updateGlow() {
        const glowColorSize = Math.floor(this.glowColorSizeSlider.progress * this.maxColorSize * 1000) / 1000;
        const glowThreshold = Math.floor(this.glowThresholdSlider.progress * this.maxTreshold * 100) / 100;
        const R = Math.floor(this.colorRSlider.progress * 255);
        const G = Math.floor(this.colorGSlider.progress * 255);
        const B = Math.floor(this.colorBSlider.progress * 255);
        const A = Math.floor(this.colorASlider.progress * 255);

        this._updateLabel(glowColorSize, glowThreshold, R, G, B, A);
        this._updateMaterial(glowColorSize, glowThreshold, R, G, B, A);
    }

    _updateLabel(glowColorSize, glowThreshold, R, G, B, A) {
        this.glowColorSize.string = glowColorSize;
        this.glowThreshold.string = glowThreshold;
        this.colorR.string = R;
        this.colorG.string = G;
        this.colorB.string = B;
        this.colorA.string = A;
    }

    _updateMaterial(glowColorSize, glowThreshold, R, G, B, A) {
        /**
         * - 获取渲染组件的材质
         * - 给材质的 uniform 变量跟新值
         * - 重新将材质设置回去
         */
        const sprite = this.sprite;
        let material: cc.Material = sprite.getMaterial(0);
        material.setProperty("glowColorSize", glowColorSize);
        material.setProperty("glowThreshold", glowThreshold);
        material.setProperty("glowColor", cc.color(R, G, B, A));
        sprite.setMaterial(0, material);
    }

    onSlider(slider) {
        this._updateGlow();
    }
}
