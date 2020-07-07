const { ccclass, property } = cc._decorator;

/**
 * 光点的效果
 * 1.原理：
 * - 画圆
 * - 中心点透明度为1.0，边缘透明度为0.0
 * - 在圆图形上叠加
 * 
 * 2.确定参数
 * - 圆心:(x, y)
 * - 半径:radius
 * - 光的颜色: cc.Color
 * 
 * 3.具体实现:
 * - 判断距离：当前顶点和光点的距离要小于半径才处理
 * - 获取透明度：根据距离设定alpha值 [1.0 - 0.0]
 * - 混合图形
 *
 */
@ccclass
export default class PointLight extends cc.Component {
    @property(cc.Sprite) sprite: cc.Sprite = null;
    @property(cc.Label) pointCenterLabel: cc.Label = null;
    @property(cc.Label) pointSizeLabel: cc.Label = null;
    @property(cc.Label) pointColorLabel: cc.Label = null;


    maxSize = 1.0; //最大半径

    pointCenter: cc.Vec2 = cc.v2(0.5, 0.5); //圆心
    pointSize = 0.3 //半径
    pointColor = cc.color(255, 0, 0, 255); //颜色
    cutAlpha = 0.0; //裁剪透明区域的
    enableFog = 0.0; //是否启用迷雾

    start() {
        this._updateMaterial();
    }

    onEnable() {
        this.sprite.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.sprite.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.sprite.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.sprite.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }
    onDisable() {
        this.sprite.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.sprite.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.sprite.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.sprite.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }
    onTouchStart(event) {
        console.log(event);
        this.setPointCenter(event);
    }
    onTouchMove(event) {
        this.setPointCenter(event);
    }
    onTouchEnd(event) {
        this.setPointCenter(event);
    }
    onTouchCancel() {

    }
    setPointCenter(event?: cc.Event.EventTouch) {
        if (!event) {
            this.pointCenter = cc.v2(0.5, 0.5);
            this._updateMaterial();
            return;
        } else {
            // var pos = event.touch.getLocationInView();
            const target: cc.Node = event.target;
            let pos = event.touch.getLocation();
            console.log('pos', pos.toString());
            pos = target.parent.convertToNodeSpaceAR(pos);
            pos = cc.v2(pos.x / target.width, pos.y / target.height);
            pos = cc.v2(pos.x + 0.5, 0.5 - pos.y);
            console.log('pos', pos.toString());
            this.pointCenter = pos;
            this._updateMaterial();
        }
    }


    /**
     * 更新材质
     * - 获取渲染组件的材质
     * - 给材质的 uniform 变量跟新值
     * - 重新将材质设置回去
    * */
    _updateMaterial() {
        const sprite = this.sprite;
        let material: cc.Material = sprite.getMaterial(0);
        material.setProperty("pointCenter", this.pointCenter);
        material.setProperty("pointSize", this.pointSize);
        material.setProperty("pointColor", this.pointColor);
        material.setProperty("cutAlpha", this.cutAlpha);
        material.setProperty("enableFog", this.enableFog);
        sprite.setMaterial(0, material);
    }
}
