const { ccclass, property } = cc._decorator;

/**
 * 马赛克的原理很简单，一句话形容就是 m x n 方块内取同一颜色 ，具体为两个步骤：
    将纹理分成 m x n 个方块
    方块内取同一个颜色
 */
@ccclass
export default class Mosaic extends cc.Component {
    @property(cc.Sprite) sprite: cc.Sprite = null;
    @property(cc.Label) xCount: cc.Label = null;
    @property(cc.Label) yCount: cc.Label = null;
    @property(cc.Label) xyCount: cc.Label = null;
    @property(cc.Slider) xSlider: cc.Slider = null;
    @property(cc.Slider) ySlider: cc.Slider = null;
    @property(cc.Slider) xySlider: cc.Slider = null;

    TOTAL = 2000;
    xNum = 30.0;
    yNum = 30.0;
    
    start() {
        this.updateSlider('xy');
    }

    /**
    * 更新渲染组件的材质
     *
     * 1. 获取材质
     * 2. 给材质的 unitform 变量赋值
     * 3. 重新将材质赋值回去
     */
    updateMaterial() {
        // X轴方块数量 [1.0, 正无穷]
        const xBlockCount: number = this.xNum;
        //Y轴方块数量 [1.0, 正无穷]
        const yBlockCount: number = this.yNum;

        const sprite = this.sprite;
        let material: cc.Material = sprite.getMaterial(0);
        material.setProperty('xBlockCount', xBlockCount);
        material.setProperty('yBlockCount', yBlockCount);
        sprite.setMaterial(0, material);
    }

    renderLabel() {
        this.xCount.string = this.xNum + '';
        this.yCount.string = this.yNum + '';
        this.xyCount.string = this.xNum + this.yNum + '';
    }

    updateSlider(xy) {
        if (xy == 'x') {
            this.xSlider.progress = this.xNum / this.TOTAL;
        } else if (xy == 'y') {
            this.ySlider.progress = this.yNum / this.TOTAL;
        } else {
            this.xySlider.progress = (this.xNum + this.yNum) / (this.TOTAL * 2);
        }
    }

    getCount(slider, xy?) {
        return Math.round(slider.progress * this.TOTAL);
    }
    onSliderX(slider) {
        const count = this.getCount(slider);
        this.xNum = count;
        this.renderLabel();
        this.updateMaterial();
        this.updateSlider('x');
        this.updateSlider('xy');
    }
    onSliderY(slider) {
        const count = this.getCount(slider);
        this.yNum = count;
        this.renderLabel();
        this.updateMaterial();
        this.updateSlider('y');
        this.updateSlider('xy');
    }
    onSliderXY(slider) {
        const count = this.getCount(slider, 'xy');
        this.xNum = count;
        this.yNum = count;
        this.updateSlider('x');
        this.updateSlider('y');
        this.updateMaterial();
        this.renderLabel();
    }
}
