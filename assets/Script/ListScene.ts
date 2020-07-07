const { ccclass, property } = cc._decorator;

@ccclass
export default class ListScene extends cc.Component {
    @property(cc.Node) listPage: cc.Node = null;
    @property(cc.Node) pageNode: cc.Node = null;

    start() {
        this.showList(true);
    }
    onEnable() {
        cc.game.on('SELECT_EFFECT', this.selectEffect, this);
    }
    onDisable() {
        cc.game.off('SELECT_EFFECT', this.selectEffect, this);
    }
    showList(isShow) {
        this.listPage.active = !!isShow;
    }

    selectEffect(effectName) {
        const url = effectName;
        cc.loader.loadRes(url, cc.Prefab, (err, prefab) => {
            if (err) {
                cc.error('load effect error!');
                cc.error(err);
                return;
            }
            this.showList(false);
            this.pageNode.destroyAllChildren();
            const node = cc.instantiate(prefab);
            this.pageNode.addChild(node);
        });
    }

    onClickListBtn() {
        this.showList(!this.listPage.active);
    }
}
