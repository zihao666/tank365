package business

import model.View


/**
 * ClassName:AttackAble
 * Description:攻击能力
 */
interface AttackAble:View {
    //子弹的所有者
    var owner:View
    //攻击力
    var attackPower:Int
    /**
     * 判断是否会攻击
     */
    fun willCollision(suffer:SufferAble):Boolean

    /**
     * 通知攻击者发生了碰撞
     */
    fun notifyAttack(suffer:SufferAble)
}