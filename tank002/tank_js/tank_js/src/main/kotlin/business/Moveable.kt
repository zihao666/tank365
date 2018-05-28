package business

import Config
import enums.Direction
import model.View


/**
 * ClassName:Moveable
 * Description:运动能力
 */
interface Moveable:View{
    var direction:Direction
    val speed:Int

    var badBlock:Blockable?
    //碰撞方向
    var badDirection:Direction?
    /**
     * 判断是否碰撞
     * @param block 阻挡物
     * @return 返回碰撞的方向 如果没有碰撞就返回null
     */
    fun willCollsion(block:Blockable):Direction?{
        //加上将要移动的距离之后再判断是否会碰撞
        var x = this.x
        var y = this.y

        when(direction){
            Direction.UP -> y -= speed
            Direction.DOWN -> y += speed
            Direction.LEFT -> x -= speed
            Direction.RIGHT -> x += speed
        }

        //下面
//        if(y>=block.y+block.height){
//            return null
//        }else if(y+height<=block.y){
//            return null
//        }else if(x>=block.x+block.width){
//            return null
//        }else if(x+width<=block.x){
//            return null
//        }else {
//            return direction
//        }
//
//        //坦克越界
//        if(x<0){
//            x = 0
//        }else if(x>Config.blockSize*12){
//            x = Config.blockSize*12
//        }
//        if(y<0){
//            y = 0
//        }else if(y>Config.blockSize*12){
//            y = Config.blockSize*12
//        }

        if(y>=block.y+block.height||y+height<=block.y||x>=block.x+block.width||x+width<=block.x){
            //坦克越界
            if(x<0||x>Config.blockSize*12||y<0||y>Config.blockSize*10){
                return direction
            }
            return null
        }else {
            return direction
        }


    }

    /**
     * 通知发生碰撞了
     * @param badBlock 碰撞物
     * @param badDirection 碰撞方向
     */
    fun notifyCollision(badBlock:Blockable?,badDirection:Direction?)
}