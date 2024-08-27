import express from 'express';
import PDFDocument from 'pdfkit';
import { PassThrough } from 'stream';

const router = express.Router();

// Route to generate a PDF with recipes
router.post('/', async (req, res) => {
    const recipes = req.body.recipes;

    if (!recipes || recipes.length === 0) {
        return res.status(400).json({ error: 'No recipes provided' });
    }

    // Create a new PDF document
    const doc = new PDFDocument();
    const stream = new PassThrough();
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename="recipes.pdf"');
    doc.pipe(stream);
    stream.pipe(res);

    recipes.forEach(recipe => {
        doc.fontSize(25).text(recipe.title)

            .text(' ')
            .fontSize(16).text('Nutrition')
            .moveDown(0.2)
            .fontSize(12).text(`    Calories: ${recipe.caloriesPerServing.toFixed(2)} kcal/serving`)
            .moveDown(0.2)
            .text(`    Serving Size: ${recipe.servingSize}`)

            .moveDown(1.5)
            .fontSize(16).text('Diet and Health Information')
            .moveDown(0.5)
            .font('Helvetica-Bold').fontSize(12).text('    Diet Labels: ', { continued: true })
            .font('Helvetica').text(recipe.dietLabels.join(', '))
            .moveDown(0.5)
            .font('Helvetica-Bold').text('    Health Labels: ', { continued: true })
            .font('Helvetica').text(recipe.healthLabels.join(', '))

            .text(' ')
            .fontSize(16).text('Ingredients')
            .moveDown(0.5)
            .fontSize(12).list(recipe.ingredients)

            .moveDown(4);
    });

    doc.end();
});

export default router;
