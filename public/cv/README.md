# CV/Resume Structure

This folder contains Gaseema's professional resume/CV with viewing and download capabilities.

## Files

- `Gaseema_Ndungu_Resume.pdf` - Professional resume in PDF format

## Integration Points

### 1. TalentModal Integration

- **Location**: `components/ui/modals/TalentModal.tsx`
- **Functionality**: Resume button opens CV viewer modal
- **User Flow**: Click "📄 Resume" → View PDF in modal → Download option available

### 2. CVViewer Component

- **Location**: `components/CVViewer.tsx`
- **Features**:
  - PDF viewer with embedded iframe
  - Download functionality
  - Responsive modal design
  - Professional styling with gradients

### 3. AI Assistant Responses

- **Location**: `lib/groq.ts`
- **CV-related queries**: Handled with specific responses directing users to the hire section
- **Examples**:
  - "Can I see your resume?" → Directs to hire button
  - "Do you have a CV?" → Explains where to find it

## User Experience

### Viewing CV

1. User clicks "Ready to Launch Together?" (rocket button)
2. TalentModal opens with hire information
3. User clicks "📄 Resume" button
4. CV viewer modal opens with PDF embedded
5. User can read, zoom, and navigate the PDF

### Downloading CV

1. From CV viewer modal: Click "Download" button
2. Direct download: PDF file downloads as "Gaseema_Ndungu_Resume.pdf"
3. From any CV request in chat: AI directs to hire section

## Technical Details

### PDF Viewer Features

- Embedded iframe with PDF.js support
- Toolbar enabled for navigation
- No navigation panes (clean view)
- Scrollbar enabled for long documents
- Responsive design for mobile/desktop

### File Management

- Clean, professional filename: `Gaseema_Ndungu_Resume.pdf`
- Organized in dedicated `/cv/` folder
- Proper MIME type handling for downloads
- Cross-browser compatibility

## Future Enhancements

- Version control for resume updates
- Multiple format support (PDF, DOC)
- Analytics tracking for downloads
- Print functionality
- Share via email integration
