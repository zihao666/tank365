package core

import org.w3c.dom.CanvasRenderingContext2D
import org.w3c.dom.HTMLImageElement
import org.w3c.dom.ImageBitmap
import org.w3c.dom.ImageData
import org.w3c.files.File
import kotlin.browser.document
import kotlin.browser.window


/**
 * ClassName:Painter
 * Description:画家
 */
object Painter {
    lateinit var ctx: CanvasRenderingContext2D
    fun initCtx(ctx: CanvasRenderingContext2D) {
        this.ctx = ctx
    }

    /**
     * 绘制颜色
     * @param color 颜色
     * @param x x坐标
     * @param y y坐标
     * @param w 宽度
     * @param h 高度
     */
    fun drawColor(color: String, x: Double, y: Double, w: Double, h: Double) {
        ctx.fillStyle = color
        ctx.fillRect(x, y, w, h)
        //复位
        ctx.fillStyle = "#00000000"
    }

    /**
     * 绘制图片
     * @param imgPath 图片地址
     * @param x x坐标
     * @param y y坐标
     */
    fun drawImage(imgPath: String, x: Int, y: Int) {
//        HTMLImageElement
        val ele = document.createElement("img") as HTMLImageElement
        ele.src = imgPath
        ctx.drawImage(ele, x.toDouble(), y.toDouble())
    }

    fun size(imgPath: String, block: (Array<Int>) -> Unit){
        val ele = document.createElement("img") as HTMLImageElement
        ele.src = imgPath
        ele.onload = {
            block(arrayOf(ele.naturalWidth, ele.naturalHeight))
        }
    }
}