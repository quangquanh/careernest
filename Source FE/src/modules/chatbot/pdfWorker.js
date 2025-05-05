import * as pdfjsLib from 'pdfjs-dist';

// Nếu bạn sao chép là pdf.worker.min.mjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;