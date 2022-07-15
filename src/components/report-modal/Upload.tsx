import { useState, useCallback } from 'react';
// material
import { styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  Stack,
  Switch,
  Container,
  CardHeader,
  Typography,
  CardContent,
  FormControlLabel
} from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../routes/paths';
// utils
import { fData } from '../../utils/formatNumber';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { UploadAvatar, UploadMultiFile, UploadSingleFile } from '../../components/upload';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

interface UploadProps {
  onChangeFiles: (files: any) => void;
}

export default function Upload({ onChangeFiles }: UploadProps) {
  const [preview, setPreview] = useState(false);
  const [files, setFiles] = useState<(File | string)[]>([]);
  const [file, setFile] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  const handleDropMultiFile = useCallback(
    (acceptedFiles) => {
      const files = acceptedFiles.map((file: File) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      );
      setFiles(files);
      onChangeFiles(files);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setFiles]
  );

  const handleRemoveAll = () => {
    setFiles([]);
    onChangeFiles([]);
  };

  const handleRemove = (file: File | string) => {
    const filteredItems = files.filter((_file) => _file !== file);
    setFiles(filteredItems);
    onChangeFiles(filteredItems);
  };

  return (
    <>
      <CardContent>
        <FormControlLabel
          control={
            <Switch checked={preview} onChange={(event) => setPreview(event.target.checked)} />
          }
          label="Show Preview"
        />
        <UploadMultiFile
          showPreview={preview}
          files={files}
          onDrop={handleDropMultiFile}
          onRemove={handleRemove}
          onRemoveAll={handleRemoveAll}
        />
      </CardContent>
    </>
  );
}
