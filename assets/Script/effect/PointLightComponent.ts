const { ccclass, property } = cc._decorator;

@ccclass
export default class PointLightCtrlComponent extends cc.Component {
    private _ubo: PointLightUBO = new PointLightUBO();

    onEnable() {
        this.node.on(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.on("on_property_change", this._onPropertyChange, this);
    }

    onDisable() {
        this.node.off(cc.Node.EventType.TOUCH_START, this._onTouchStart, this);
        this.node.off(cc.Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
        this.node.off("on_property_change", this._onPropertyChange, this);
    }

    private _onTouchStart(event: cc.Event.EventTouch) {
        this._onTouchMove(event);
    }

    private _onTouchMove(event: cc.Event.EventTouch) {
        let touchPointInWorldSpace = event.getLocation();
        let touchPointInNodeSpace = this.node.convertToNodeSpaceAR(touchPointInWorldSpace);

        // 将触摸点转换为OPENGL坐标系并归一化
        // OpenGl 坐标系原点在左上角
        this._ubo.centerPoint = cc.v2(
            this.node.anchorX + touchPointInNodeSpace.x / this.node.width,
            1 - (this.node.anchorY + touchPointInNodeSpace.y / this.node.height)
        );

        this._updateMaterial();
    }

    private _onPropertyChange(pointLightUBO: PointLightUBO) {
        this._ubo.centerColor = pointLightUBO.centerColor;
        this._ubo.radius = pointLightUBO.radius;
        this._ubo.cropAlpha = pointLightUBO.cropAlpha;
        this._ubo.enableFog = pointLightUBO.enableFog;
        this._updateMaterial();
    }

    private _updateMaterial() {
        this.getComponents(cc.RenderComponent).forEach(renderComponent => {
            let material: cc.Material = renderComponent.getMaterial(0);
            material.setProperty("centerColor", this._ubo.centerColor);
            material.setProperty("centerPoint", this._ubo.centerPoint);
            material.setProperty("radius", this._ubo.radius);
            material.setProperty("cropAlpha", this._ubo.cropAlpha);
            material.setProperty("enableFog", this._ubo.enableFog);
            renderComponent.setMaterial(0, material);
        });
    }
}

export class PointLightUBO {
    /**
     * 中心点颜色
     */
    centerColor: cc.Color = cc.Color.YELLOW;

    /**
     * 中心点坐标 ([0.0, 1.0], [0.0, 1.0])
     */
    centerPoint: cc.Vec2 = cc.v2(0.5, 0.5);

    /**
     * 扩散半径 [0.0, 1.0]
     */
    radius: number = 0.5;

    /**
     * 是否裁剪掉透明区域上的点光
     */
    cropAlpha: boolean = true;

    /**
     * 是否开启战争迷雾效果
     */
    enableFog: boolean = false;
}
