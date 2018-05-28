package model

import Config
import business.DestoryAble
import core.Painter


/**
 * ClassName:Blast
 * Description:爆炸物
 */
class Blast(override var x: Int, override var y: Int) :DestoryAble {
    override val width: Int = Config.blockSize
    override val height: Int = Config.blockSize

    //爆炸物图片集合
    val list = ArrayList<String>()
    //绘制的图片角标
    var index = 0
    init {
        (1..32).forEach {
            list.add("img/blast_${it}.png")
        }
    }

    override fun draw() {
        index %= list.size
        Painter.drawImage(list.get(index),x,y)
        index++
    }

    override fun needDestory(): Boolean = index == list.size

}