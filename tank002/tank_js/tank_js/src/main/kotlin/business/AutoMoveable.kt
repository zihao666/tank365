package business

import enums.Direction
import model.View


/**
 * ClassName:AutoMoveable
 * Description:自动移动的能力
 */
interface AutoMoveable:View {
    var direction: Direction
    val speed:Int
    /**
     * 自动移动的方法
     */
    fun autoMove()
}