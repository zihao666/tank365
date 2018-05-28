package model

import Config
import business.Blockable
import core.Painter


/**
 * ClassName:Grass
 * Description:水墙
 */
class Water(override var x: Int, override var y: Int) :Blockable{
    override val width: Int = Config.blockSize
    override val height: Int = Config.blockSize

    override fun draw() {
        Painter.drawImage("img/water.gif",x,y)
    }
}