import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface CompToPDFProps{
    fileName:string;
}
const PDFFile = {
    A4:[592.28,841.89]
};

// 自定义hook函数
const useCompToPDF = (props:CompToPDFProps) => {
    
    const {fileName} = props;
    const exportPDF = (element:HTMLElement | null) => {

        // 滚动到顶部，避免打印不全
        document.documentElement.scrollTop = 0;

        if(element){
            html2canvas(element).then((canvas: any)=>{
                // 获得画布宽高
                let canvasWidth= canvas.width;
                let canvasHeight = canvas.height;
                // 一页PDF显示html生成的canvas高度
                let pdfPageHeight=(PDFFile.A4[1]/PDFFile.A4[0])*canvasWidth;
                // 未生成PDF的html页面内高度
                let pdfAllHeight = canvasHeight;

                let position =0; //页面偏移

                // 转换图片未dataURL，参数：图片格式和清晰度（0-1）
                let pageData = canvas.toDataURL('image/jpeg',1.0);

                // html页面生成的canvas在pdf图片的宽高
                let imgWidth = PDFFile.A4[0] - 60; //减去边距宽度
                let imgHeight = (canvasHeight/canvasWidth)*PDFFile.A4[0];

                // 方向 p：竖直 l：横向，尺寸ponits，格式A4
                let pdf = new jsPDF('p','pt',PDFFile.A4);

                // 当内容未超过pdf一页显示的范围，无需分页
                if(pdfAllHeight < pdfPageHeight) {
                    // 从图片顶部开始打印 30左右边距， 0 上下边距
                    pdf.addImage(pageData,'jpeg',30,0,imgWidth,imgHeight);
                } else {
                    while(pdfAllHeight > 0){
                        pdf.addImage(pageData,'jpeg',0,position,imgWidth,imgHeight);
                        pdfAllHeight-=pdfPageHeight;
                        position-=PDFFile.A4[1];
                        // 避免添加空白页
                        if(pdfAllHeight>0){
                            pdf.addPage();
                        }
                    }
                }
                pdf.save(`${fileName}.pdf`);
            });
        }
    }
    return {
        exportPDF,
    };
};

export default useCompToPDF;