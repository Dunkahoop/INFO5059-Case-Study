package com.info5059casestudy.casestudy.purchaseorder;

import java.util.Optional;
import org.springframework.web.servlet.view.document.AbstractPdfView;
import java.math.BigDecimal;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.net.URL;
import java.time.LocalDateTime;

import com.info5059casestudy.casestudy.product.Product;
import com.info5059casestudy.casestudy.product.ProductRepository;
import com.info5059casestudy.casestudy.vendor.Vendor;
import com.info5059casestudy.casestudy.vendor.VendorRepository;
import com.itextpdf.io.exceptions.IOException;
import com.itextpdf.io.font.constants.StandardFonts;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.colors.ColorConstants;
import com.itextpdf.kernel.font.PdfFont;
import com.itextpdf.kernel.font.PdfFontFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.borders.Border;
import com.itextpdf.layout.element.Cell;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.element.Table;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;
import com.itextpdf.layout.properties.UnitValue;
import java.time.format.DateTimeFormatter;
import java.util.logging.Level;
import java.util.logging.Logger;

public abstract class PurchaseOrderPDFGenerator extends AbstractPdfView {
    public static ByteArrayInputStream generateReport(
            String orderid,
            VendorRepository vendorRepository,
            PurchaseOrderRepository purchaseOrderRepository,
            ProductRepository productRepository) throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try {
            // pdf generation code goes here
            PdfWriter writer = new PdfWriter(baos);
            PdfDocument pdf = new PdfDocument(writer);
            Document document = new Document(pdf);
            PdfFont font = PdfFontFactory.createFont(StandardFonts.HELVETICA);
            URL imageUrl = PurchaseOrderPDFGenerator.class.getResource("/static/images/vendor-icon.png");
            Image img = new Image(ImageDataFactory.create(imageUrl)).setHorizontalAlignment(HorizontalAlignment.LEFT);
            document.add(img);
            document.add(new Paragraph(String.format("Purchase Order #" + orderid))
                    .setFont(font).setFontSize(12)
                    .setTextAlignment(TextAlignment.RIGHT).setBold());
            Table table = new Table(5);
            table.setWidth(new UnitValue(UnitValue.PERCENT, 100));
            Cell cell = new Cell().add(new Paragraph("ID"))
                    .setFont(font).setFontSize(12).setBold().setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);
            cell = new Cell().add(new Paragraph("Product Name"))
                    .setFont(font).setFontSize(12).setBold().setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);
            cell = new Cell().add(new Paragraph("Qty Sold"))
                    .setFont(font).setFontSize(12).setBold().setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);
            cell = new Cell().add(new Paragraph("Price"))
                    .setFont(font).setFontSize(12).setBold().setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);
            cell = new Cell().add(new Paragraph("Ext. Price"))
                    .setFont(font).setFontSize(12).setBold().setTextAlignment(TextAlignment.CENTER);
            table.addCell(cell);
            Optional<PurchaseOrder> nullableOrder = purchaseOrderRepository.findById(Long.parseLong(orderid));
            if (nullableOrder.isPresent()) {
                PurchaseOrder order = nullableOrder.get();
                order.getVendorid();
                Optional<Vendor> nullableVendor = vendorRepository.findById(order.getVendorid());
                if (nullableVendor.isPresent()) {
                    Vendor vendor = nullableVendor.get();
                    String vendorInfo = vendor.getName() + "\n"
                            + vendor.getAddress1() + "\n"
                            + vendor.getCity() + "\n"
                            + vendor.getProvince() + "\n"
                            + vendor.getEmail();
                    document.add(new Paragraph("Vendor:\n" + vendorInfo))
                            .setFont(font).setFontSize(12).setTextAlignment(TextAlignment.LEFT).setBold();
                }
                // BigDecimal orderTotal = new BigDecimal(0);
                for (PurchaseOrderItem item : order.getItems()) {
                    // check if product added actually exists, otherwise skip it
                    Optional<Product> nullableProduct = productRepository.findById(item.getProductid());
                    if (!nullableProduct.isPresent())
                        continue;
                    String productId = item.getProductid();
                    String productName = item.getProductname();
                    String quantity = "" + item.getQty();
                    String price = "" + item.getPrice();
                    String priceExtended = "" + item.getPrice().multiply(BigDecimal.valueOf(item.getQty()));
                    cell = new Cell().add(new Paragraph(productId)
                            .setFont(font).setFontSize(12).setTextAlignment(TextAlignment.CENTER));
                    table.addCell(cell);
                    cell = new Cell().add(new Paragraph(productName)
                            .setFont(font).setFontSize(12).setTextAlignment(TextAlignment.CENTER));
                    table.addCell(cell);
                    cell = new Cell().add(new Paragraph(quantity)
                            .setFont(font).setFontSize(12).setTextAlignment(TextAlignment.CENTER));
                    table.addCell(cell);
                    cell = new Cell().add(new Paragraph(price)
                            .setFont(font).setFontSize(12).setTextAlignment(TextAlignment.RIGHT));
                    table.addCell(cell);
                    cell = new Cell().add(new Paragraph(priceExtended)
                            .setFont(font).setFontSize(12).setTextAlignment(TextAlignment.RIGHT));
                    table.addCell(cell);
                }
                cell = new Cell(1, 4).add(new Paragraph("Subtotal:")
                        .setBorder(Border.NO_BORDER).setFont(font).setFontSize(12).setBold()
                        .setTextAlignment(TextAlignment.RIGHT));
                table.addCell(cell);
                cell = new Cell().add(new Paragraph(order.getSubtotal().toString())
                        .setFont(font).setFontSize(12)
                        .setBold().setTextAlignment(TextAlignment.RIGHT));
                table.addCell(cell);
                cell = new Cell(1, 4).add(new Paragraph("Tax:")
                        .setBorder(Border.NO_BORDER).setFont(font).setFontSize(12).setBold()
                        .setTextAlignment(TextAlignment.RIGHT));
                table.addCell(cell);
                cell = new Cell().add(new Paragraph(order.getTax().toString())
                        .setFont(font).setFontSize(12)
                        .setBold().setTextAlignment(TextAlignment.RIGHT));
                table.addCell(cell);
                cell = new Cell(1, 4).add(new Paragraph("Total:")
                        .setBorder(Border.NO_BORDER).setFont(font).setFontSize(12).setBold()
                        .setTextAlignment(TextAlignment.RIGHT));
                table.addCell(cell);
                cell = new Cell().add(new Paragraph(order.getTotal().toString())
                        .setFont(font).setFontSize(12)
                        .setBold().setTextAlignment(TextAlignment.RIGHT)
                        .setBackgroundColor(ColorConstants.YELLOW));
                table.addCell(cell);
            }
            document.add(new Paragraph("\n"));
            document.add(table);
            document.add(new Paragraph("\n"));
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
            document.add(new Paragraph(dateTimeFormatter.format(LocalDateTime.now()))
                    .setTextAlignment(TextAlignment.CENTER));
            document.close();
        } catch (Exception ex) {
            Logger.getLogger(PurchaseOrderPDFGenerator.class.getName()).log(Level.SEVERE, null, ex);
        }
        return new ByteArrayInputStream(baos.toByteArray());
    }
}
