require('dotenv').config();
const mongoose = require('mongoose');
const Item = require('./models/Item');
const { StockDetail } = require('./models/Stock');

const itemsData = [
  { "id": 1, "item_name": "Ball Pen (Blue)", "category": "Writing Instruments" },
  { "id": 2, "item_name": "Ball Pen (Black)", "category": "Writing Instruments" },
  { "id": 3, "item_name": "Ball Pen (Red)", "category": "Writing Instruments" },
  { "id": 4, "item_name": "Gel Pen (Blue)", "category": "Writing Instruments" },
  { "id": 5, "item_name": "Gel Pen (Black)", "category": "Writing Instruments" },
  { "id": 6, "item_name": "Gel Pen (Red)", "category": "Writing Instruments" },
  { "id": 7, "item_name": "Fountain Pen", "category": "Writing Instruments" },
  { "id": 8, "item_name": "Pencil (HB)", "category": "Writing Instruments" },
  { "id": 9, "item_name": "Pencil (2B)", "category": "Writing Instruments" },
  { "id": 10, "item_name": "Sketch Pen Set", "category": "Writing Instruments" },
  { "id": 11, "item_name": "Marker Pen (Black)", "category": "Writing Instruments" },
  { "id": 12, "item_name": "Marker Pen (Blue)", "category": "Writing Instruments" },
  { "id": 13, "item_name": "Marker Pen (Red)", "category": "Writing Instruments" },
  { "id": 14, "item_name": "Highlighter (Yellow)", "category": "Writing Instruments" },
  { "id": 15, "item_name": "Highlighter (Green)", "category": "Writing Instruments" },
  { "id": 16, "item_name": "Whiteboard Marker (Black)", "category": "Writing Instruments" },
  { "id": 17, "item_name": "Whiteboard Marker (Blue)", "category": "Writing Instruments" },
  { "id": 18, "item_name": "Whiteboard Marker (Red)", "category": "Writing Instruments" },
  { "id": 19, "item_name": "Permanent Marker", "category": "Writing Instruments" },
  { "id": 20, "item_name": "Ink Pen", "category": "Writing Instruments" },
  { "id": 21, "item_name": "Roller Ball Pen", "category": "Writing Instruments" },
  { "id": 22, "item_name": "A4 Paper (500 Sheets)", "category": "Paper Products" },
  { "id": 23, "item_name": "A3 Paper (500 Sheets)", "category": "Paper Products" },
  { "id": 24, "item_name": "A4 Paper Ream", "category": "Paper Products" },
  { "id": 25, "item_name": "Carbon Paper", "category": "Paper Products" },
  { "id": 26, "item_name": "Tracing Paper", "category": "Paper Products" },
  { "id": 27, "item_name": "Graph Paper", "category": "Paper Products" },
  { "id": 28, "item_name": "Ruled Notebook (200 Pages)", "category": "Paper Products" },
  { "id": 29, "item_name": "Ruled Notebook (100 Pages)", "category": "Paper Products" },
  { "id": 30, "item_name": "Spiral Notebook", "category": "Paper Products" },
  { "id": 31, "item_name": "Register (500 Pages)", "category": "Paper Products" },
  { "id": 32, "item_name": "Register (200 Pages)", "category": "Paper Products" },
  { "id": 33, "item_name": "Long Book", "category": "Paper Products" },
  { "id": 34, "item_name": "Short Book", "category": "Paper Products" },
  { "id": 35, "item_name": "Drawing Book", "category": "Paper Products" },
  { "id": 36, "item_name": "Rough Register", "category": "Paper Products" },
  { "id": 37, "item_name": "Log Book", "category": "Paper Products" },
  { "id": 38, "item_name": "Attendance Register", "category": "Paper Products" },
  { "id": 39, "item_name": "Stock Register", "category": "Paper Products" },
  { "id": 40, "item_name": "Letter Pad", "category": "Paper Products" },
  { "id": 41, "item_name": "Sticky Notes (Post-it)", "category": "Paper Products" },
  { "id": 42, "item_name": "Index Card", "category": "Paper Products" },
  { "id": 43, "item_name": "Tissue Paper", "category": "Paper Products" },
  { "id": 44, "item_name": "L Folder (A4)", "category": "Files & Folders" },
  { "id": 45, "item_name": "Ring Binder (A4)", "category": "Files & Folders" },
  { "id": 46, "item_name": "Plastic File Folder", "category": "Files & Folders" },
  { "id": 47, "item_name": "Document Folder", "category": "Files & Folders" },
  { "id": 48, "item_name": "Clip File", "category": "Files & Folders" },
  { "id": 49, "item_name": "Box File", "category": "Files & Folders" },
  { "id": 50, "item_name": "Manila Folder", "category": "Files & Folders" },
  { "id": 51, "item_name": "Accordion File", "category": "Files & Folders" },
  { "id": 52, "item_name": "Transparent File Folder", "category": "Files & Folders" },
  { "id": 53, "item_name": "Report Cover", "category": "Files & Folders" },
  { "id": 54, "item_name": "Spiral Binder", "category": "Files & Folders" },
  { "id": 55, "item_name": "Stapler (Mini)", "category": "Office Supplies" },
  { "id": 56, "item_name": "Stapler (Standard)", "category": "Office Supplies" },
  { "id": 57, "item_name": "Stapler Pin (No.10)", "category": "Office Supplies" },
  { "id": 58, "item_name": "Stapler Pin (No.24/6)", "category": "Office Supplies" },
  { "id": 59, "item_name": "Paper Clip (Box)", "category": "Office Supplies" },
  { "id": 60, "item_name": "Binder Clip (Small)", "category": "Office Supplies" },
  { "id": 61, "item_name": "Binder Clip (Medium)", "category": "Office Supplies" },
  { "id": 62, "item_name": "Binder Clip (Large)", "category": "Office Supplies" },
  { "id": 63, "item_name": "Rubber Band (Box)", "category": "Office Supplies" },
  { "id": 64, "item_name": "Drawing Pin (Box)", "category": "Office Supplies" },
  { "id": 65, "item_name": "Thumb Pin (Box)", "category": "Office Supplies" },
  { "id": 66, "item_name": "Cello Tape (1 inch)", "category": "Office Supplies" },
  { "id": 67, "item_name": "Cello Tape (2 inch)", "category": "Office Supplies" },
  { "id": 68, "item_name": "Masking Tape", "category": "Office Supplies" },
  { "id": 69, "item_name": "Double Sided Tape", "category": "Office Supplies" },
  { "id": 70, "item_name": "Fevicol (Tube)", "category": "Office Supplies" },
  { "id": 71, "item_name": "Fevistick (Glue Stick)", "category": "Office Supplies" },
  { "id": 72, "item_name": "White Correction Fluid", "category": "Office Supplies" },
  { "id": 73, "item_name": "Correction Tape", "category": "Office Supplies" },
  { "id": 74, "item_name": "Scissors (Small)", "category": "Office Supplies" },
  { "id": 75, "item_name": "Scissors (Large)", "category": "Office Supplies" },
  { "id": 76, "item_name": "Cutter (Small)", "category": "Office Supplies" },
  { "id": 77, "item_name": "Cutter (Large)", "category": "Office Supplies" },
  { "id": 78, "item_name": "Paper Punching Machine", "category": "Office Supplies" },
  { "id": 79, "item_name": "Letter Opener", "category": "Office Supplies" },
  { "id": 80, "item_name": "Rubber Eraser", "category": "Office Supplies" },
  { "id": 81, "item_name": "Ink Eraser", "category": "Office Supplies" },
  { "id": 82, "item_name": "Sharpener", "category": "Office Supplies" },
  { "id": 83, "item_name": "Scale (30 cm)", "category": "Office Supplies" },
  { "id": 84, "item_name": "Scale (15 cm)", "category": "Office Supplies" },
  { "id": 85, "item_name": "Set Square", "category": "Office Supplies" },
  { "id": 86, "item_name": "Protractor", "category": "Office Supplies" },
  { "id": 87, "item_name": "Compass Set", "category": "Office Supplies" },
  { "id": 88, "item_name": "Calculator", "category": "Office Supplies" },
  { "id": 89, "item_name": "Date Stamp", "category": "Office Supplies" },
  { "id": 90, "item_name": "Ink Pad (Blue)", "category": "Office Supplies" },
  { "id": 91, "item_name": "Ink Pad (Red)", "category": "Office Supplies" },
  { "id": 92, "item_name": "Ink Pad (Black)", "category": "Office Supplies" },
  { "id": 93, "item_name": "Stamp Ink", "category": "Office Supplies" },
  { "id": 94, "item_name": "Duster (Board)", "category": "Office Supplies" },
  { "id": 95, "item_name": "Chalk (White - Box)", "category": "Office Supplies" },
  { "id": 96, "item_name": "Chalk (Colour - Box)", "category": "Office Supplies" },
  { "id": 97, "item_name": "Board Cleaner", "category": "Office Supplies" },
  { "id": 98, "item_name": "Envelope A4 (50 pcs)", "category": "Envelopes" },
  { "id": 99, "item_name": "Envelope (White - 50 pcs)", "category": "Envelopes" },
  { "id": 100, "item_name": "Envelope (Brown - 50 pcs)", "category": "Envelopes" },
  { "id": 101, "item_name": "Courier Bag", "category": "Envelopes" },
  { "id": 102, "item_name": "Bubble Wrap Envelope", "category": "Envelopes" },
  { "id": 103, "item_name": "Printer Ink Cartridge (Black)", "category": "Computer Supplies" },
  { "id": 104, "item_name": "Printer Ink Cartridge (Colour)", "category": "Computer Supplies" },
  { "id": 105, "item_name": "Toner Cartridge", "category": "Computer Supplies" },
  { "id": 106, "item_name": "CD-R (Pack of 10)", "category": "Computer Supplies" },
  { "id": 107, "item_name": "DVD-R (Pack of 10)", "category": "Computer Supplies" },
  { "id": 108, "item_name": "USB Flash Drive (8 GB)", "category": "Computer Supplies" },
  { "id": 109, "item_name": "USB Flash Drive (16 GB)", "category": "Computer Supplies" },
  { "id": 110, "item_name": "Mouse Pad", "category": "Computer Supplies" },
  { "id": 111, "item_name": "Screen Cleaning Kit", "category": "Computer Supplies" },
  { "id": 112, "item_name": "Whiteboard (2x3 ft)", "category": "Miscellaneous" },
  { "id": 113, "item_name": "Chart Paper (White)", "category": "Miscellaneous" },
  { "id": 114, "item_name": "Chart Paper (Colour)", "category": "Miscellaneous" },
  { "id": 115, "item_name": "Lamination Sheet (A4)", "category": "Miscellaneous" },
  { "id": 116, "item_name": "Binding Wire", "category": "Miscellaneous" },
  { "id": 117, "item_name": "Binding Sheet (Black)", "category": "Miscellaneous" },
  { "id": 118, "item_name": "Binding Sheet (Transparent)", "category": "Miscellaneous" },
  { "id": 119, "item_name": "ID Card Holder", "category": "Miscellaneous" },
  { "id": 120, "item_name": "Lanyard", "category": "Miscellaneous" },
  { "id": 121, "item_name": "Whiteboard Duster", "category": "Miscellaneous" },
  { "id": 122, "item_name": "Packing Tape", "category": "Miscellaneous" },
  { "id": 123, "item_name": "Bubble Wrap", "category": "Miscellaneous" },
  { "id": 124, "item_name": "File Tag", "category": "Miscellaneous" },
  { "id": 125, "item_name": "Label Sticker (A4 Sheet)", "category": "Miscellaneous" },
  { "id": 126, "item_name": "Visiting Card Holder", "category": "Miscellaneous" }
];

async function seedItems() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas');

    let successCount = 0;
    
    // Find highest current ID to avoid conflicts if DB is not empty
    const lastItem = await Item.findOne().sort({ item_id: -1 });
    let startId = lastItem ? lastItem.item_id + 1 : 1;

    for (let i = 0; i < itemsData.length; i++) {
      const data = itemsData[i];
      
      // Check if item already exists by name
      const exists = await Item.findOne({ item: data.item_name });
      if (exists) {
        console.log(`Skipping: ${data.item_name} already exists`);
        continue;
      }

      // Determine unit
      let unit = "Nos";
      if (data.item_name.includes("Box") || data.item_name.includes("Set") || data.item_name.includes("pcs")) unit = "Box";
      if (data.item_name.includes("Ream") || data.item_name.includes("Sheets")) unit = "pkt";

      const newItem = new Item({
        item_id: startId++,
        item: data.item_name,
        unit: unit,
        price: 0,
        cst: 0,
        gst: 0,
        total_amount: 0
      });

      await newItem.save();
      
      // Also initialize StockDetail
      const newStockDetail = new StockDetail({
        stock_id: newItem.item_id,
        item: newItem.item,
        unit: newItem.unit,
        total_stock: 0,
        issued_stock: 0,
        balance: 0
      });
      await newStockDetail.save();

      successCount++;
    }

    console.log(`\n✅ Successfully added ${successCount} new items!`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding items:', error);
    process.exit(1);
  }
}

seedItems();
