const { ccclass, property } = cc._decorator;

@ccclass
export default class PointTarget extends cc.Component {
    @property(cc.Sprite) sprite: cc.Sprite = null;
    @property(cc.Label) tips: cc.Label = null;

    ubo: PointLightUBO = null;

    onLoad() {
        this.ubo = new PointLightUBO();
    }
    start() {

    }
    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }
    onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.node.off(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
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
    onTouchCancel(event) {
        this.setPointCenter(event);
    }
    setPointCenter(event?: cc.Event.EventTouch) {
        if (!event) {
            this.ubo.pointCenter = cc.v2(0.5, 0.5);
            this._updateMaterial();
            return;
        } else {
            const touchPointInWorldSpace = event.getLocation();
            let touchPointInNodeSpace = this.node.convertToNodeSpaceAR(touchPointInWorldSpace);
            const pos = cc.v2(
                this.node.anchorX + touchPointInNodeSpace.x / this.node.width,
                1 - (this.node.anchorY + touchPointInNodeSpace.y / this.node.height)
            );

            // const target: cc.Node = event.target;
            // let pos = event.getLocation();
            // // console.log('pos', pos.toString());
            // // target.
            // // pos = target.parent.convertToWorldSpaceAR(pos);
            // // pos = this.node.parent.convertToWorldSpaceAR(pos);
            // pos = this.node.convertToNodeSpaceAR(pos);
            // // console.log('pos', pos.toString());
            // pos = cc.v2(pos.x / target.width, pos.y / target.height);
            // // console.log('pos', pos.toString());
            // pos = cc.v2((pos.x + 0.5), 1 - (0.5 + pos.y));
            console.log('pos', pos.toString());
            this.ubo.pointCenter = pos;
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
        const sprite = this.node.getComponent(cc.Sprite);
        let material: cc.Material = sprite.getMaterial(0);
        material.setProperty("pointCenter", this.ubo.pointCenter);
        material.setProperty("pointSize", this.ubo.pointSize);
        material.setProperty("pointColor", this.ubo.pointColor);
        material.setProperty("cutAlpha", this.ubo.cutAlpha);
        material.setProperty("enableFog", this.ubo.enableFog);
        sprite.setMaterial(0, material);
    }
}

class PointLightUBO {
    pointColor: cc.Color = cc.Color.YELLOW; //颜色
    pointCenter: cc.Vec2 = cc.v2(0.5, 0.5); //圆心[0.0, 1.0]
    pointSize = 0.5; //半径 [0.0, 1.0]
    cutAlpha = 0.0; //裁剪透明区域的
    enableFog = 0.0; //是否启用迷雾
}