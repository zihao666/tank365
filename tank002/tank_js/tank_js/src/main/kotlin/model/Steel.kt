package model

import Config
import business.AttackAble
import business.Blockable
import business.SufferAble
import core.Painter


/**
 * ClassName:Grass
 * Description:铁墙
 */
class Steel(override var x: Int, override var y: Int) :Blockable,SufferAble{
    override var blood: Int = 0

    override fun notifyAttack(attack: AttackAble):Array<View>? {
        return null
    }

    override val width: Int = Config.blockSize
    override val height: Int = Config.blockSize

    override fun draw() {
        Painter.drawImage("img/steel.gif",x,y)
    }
}