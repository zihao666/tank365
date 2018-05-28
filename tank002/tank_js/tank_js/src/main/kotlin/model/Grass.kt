package model

import Config
import core.Painter


/**
 * ClassName:Grass
 * Description:草
 */
class Grass(override var x: Int, override var y: Int) :View{
    override val width: Int = Config.blockSize
    override val height: Int = Config.blockSize

    override fun draw() {
        Painter.drawImage("img/grass.gif",x,y)
    }
}