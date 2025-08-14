# S3 Browser

A modern, production-ready web application for browsing AWS S3 buckets with a file system-like interface. Built with React, TypeScript, and Vite.

## 🚀 Features

### Core Functionality
- **S3 Bucket Browser**: Navigate S3 buckets as if they were a local file system
- **File Operations**: Create, read, and delete text files
- **Directory Management**: Create and navigate through directories (prefixes)
- **Real-time Updates**: Automatically detect and display changes to the bucket
- **Authentication**: Secure AWS credentials management with local storage

### User Interface
- **Tree View**: Hierarchical directory navigation with expand/collapse
- **File List**: Detailed view of current directory contents
- **Resizable Panels**: Adjustable layout for optimal workspace
- **Modal Dialogs**: Clean interfaces for file operations
- **Responsive Design**: Modern, intuitive UI with CSS Modules

### Technical Features
- **TypeScript**: Full type safety and better development experience
- **CSS Modules**: Scoped styling with CSS Custom Properties
- **AWS SDK v3**: Latest AWS SDK for optimal performance
- **Hot Module Replacement**: Fast development with instant updates
- **Production Ready**: Optimized build configuration

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **AWS S3 Bucket** with appropriate permissions
- **AWS Credentials** (Access Key ID, Secret Access Key, Region)

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd s3-browser
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🔧 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run dev:prod` - Build and serve production-like version (no source files in DevTools)
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Usage

### Initial Setup
1. **Configure AWS Credentials**: Enter your Access Key ID, Secret Access Key, Bucket Name, and Region
2. **Connect**: Click "Connect" to establish connection to your S3 bucket
3. **Start Browsing**: Navigate through your bucket's file structure

### Navigation
- **Tree View (Left Panel)**: 
  - Single-click to expand/collapse directories
  - Double-click to navigate to directory
- **File List (Right Panel)**:
  - View files and directories in current location
  - Click files to view content
  - Use action buttons for file operations

### File Operations
- **Create File**: Click "Add File" button in current directory
- **Create Directory**: Click "Add Folder" button in current directory
- **View File**: Click on any file to open content viewer
- **Delete**: Use delete button for files or directories

## 🏗️ Project Structure

```
src/
├── components/           # React components
│   ├── AuthForm/        # Authentication form
│   ├── FileView/        # File browser interface
│   ├── TreeView/        # Directory tree navigation
│   └── ResizablePanels/ # Layout management
├── shared/              # Shared utilities and components
│   ├── components/      # Reusable UI components
│   ├── dialogs/         # Modal dialog components
│   ├── constants/       # Application constants
│   ├── models/          # TypeScript interfaces
│   └── utils/           # Utility functions
├── hooks/               # Custom React hooks
├── pages/               # Page components
├── services/            # AWS S3 service layer
└── styles/              # Global styles and CSS variables
```

## 🎨 Design System

### CSS Custom Properties
The application uses a comprehensive design system with CSS variables:

```css
/* Colors */
--color-primary: #4A90E2;
--color-background: #2F3645;
--color-text: #FFFFFF;

/* Spacing */
--spacing-xs: 4px;
--spacing-sm: 6px;
--spacing-md: 8px;
--spacing-lg: 12px;
--spacing-xl: 16px;

/* Typography */
--font-size-base: 16px;
--font-weight-medium: 500;
```

### Component Architecture
- **CSS Modules**: Scoped styling for all components
- **Component Composition**: Reusable, composable components
- **Type Safety**: Full TypeScript integration
- **Responsive Design**: Mobile-friendly layouts

## 🔒 Security

### AWS Credentials
- **Local Storage**: Credentials stored securely in browser localStorage
- **No Backend**: All operations performed client-side
- **S3 Permissions**: Ensure your AWS credentials have appropriate S3 permissions

### Required S3 Permissions
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:GetObject",
        "s3:PutObject",
        "s3:DeleteObject"
      ],
      "Resource": [
        "arn:aws:s3:::your-bucket-name",
        "arn:aws:s3:::your-bucket-name/*"
      ]
    }
  ]
}
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Static Hosting**: Deploy to AWS S3, Netlify, Vercel, or any static host
- **Docker**: Containerize the application
- **CDN**: Use CloudFront or similar for global distribution

### Environment Variables
No environment variables required - all configuration is done through the UI.

## 🐛 Troubleshooting

### Common Issues
1. **Connection Failed**: Verify AWS credentials and bucket permissions
2. **Empty Bucket**: Create some files or directories to see content
3. **CORS Issues**: Ensure your S3 bucket has proper CORS configuration
4. **Large Files**: File viewer is optimized for text files under 1MB

### Development Tips
- Use `npm run dev:prod` to test production-like behavior
- Check browser console for detailed error messages
- Verify AWS credentials in AWS Console

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **AWS SDK v3**: For robust S3 integration
- **React Icons**: For beautiful, consistent icons
- **Vite**: For fast development and building
- **TypeScript**: For type safety and better DX
