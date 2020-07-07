import CNT from "./CNT";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ListScene extends cc.Component {
    @property(cc.Node) content: cc.Node = null;
    @property(cc.Node) selectItem: cc.Node = null;

    start () {
        this.initList();
    }
    
    initList() {
        var arr = CNT.EFFECT_LIST;
        arr.forEach((effect, idx) => {
            var node = cc.instantiate(this.selectItem);
            this.content.addChild(node);
            node.getComponent(cc.Label).string = `${idx + 1}.${effect.desc}`;
            node['effectName'] = effect.prefab;
            node.active = true;
        });
    }

    selectEffect(event: cc.Event.EventTouch, data) {
        cc.game.emit('SELECT_EFFECT', event.target.effectName);
    }
}
