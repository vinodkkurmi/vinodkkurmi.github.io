COMPUTER ROOM SYSTEM VIEWER
===========================

Files
-----
index.html    Main webpage
styles.css    Responsive styling
script.js     Filtering, counts and arrangement rendering
data.js       Data extracted from the supplied Excel workbook

How to use
----------
1. Keep all four files in the same folder.
2. Double-click index.html to open it in Chrome, Edge, Firefox or another modern browser.
3. Select a course from the dropdown or course buttons.
4. The page shows:
   - Total allocated working systems
   - 8 GB, 12 GB and 16 GB counts
   - The room/seating arrangement
   - A list of all systems allocated to the selected course

Spreadsheet interpretation
--------------------------
- DSE 413 / Advanced DL: red cells in the supplied workbook
- DSE428 / Responsible AI: green cells
- DSE423 / Graph ML: blue cells
- Black cells: not working
- * after a system number: 16 GB
- # after a system number: 12 GB
- No marker: 8 GB

The room arrangement follows the populated cells from Excel rows 9-15 and
columns B-F, then H-J, preserving the aisle/gap between F and H.
