package business

import model.View


/**
 * ClassName:SufferAble
 * Description:受攻击能力
 */
interface SufferAble:View {
    //血量值
    var blood:Int
    /**
     * 通知受攻击者发生了碰撞
     * @return 返回的爆炸物
     */
    fun notifyAttack(attack:AttackAble):Array<View>?
}