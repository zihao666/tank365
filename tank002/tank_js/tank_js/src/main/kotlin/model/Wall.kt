package model

import Config
import business.AttackAble
import business.Blockable
import business.DestoryAble
import business.SufferAble
import core.Composer
import core.Painter


/**
 * ClassName:Grass
 * Description:砖墙
 */
class Wall(override var x: Int, override var y: Int) :Blockable,SufferAble,DestoryAble{
    override fun needDestory(): Boolean {
        return blood<=0
    }

    override var blood: Int = 3

    override val width: Int = Config.blockSize
    override val height: Int = Config.blockSize

    override fun draw() {
        Painter.drawImage("img/wall.gif",x,y)
    }

    override fun notifyAttack(attack: AttackAble):Array<View>? {
        blood -= attack.attackPower
        //播放声音
        Composer.play("snd/hit.wav")
        return arrayOf(Blast(x,y))
    }
}