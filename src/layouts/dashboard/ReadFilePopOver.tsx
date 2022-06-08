import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import * as XLSX from 'xlsx';
// material
import { Box, MenuItem } from '@material-ui/core';
// icons
import fileFill from '@iconify/icons-eva/file-add-fill';
// components
import MenuPopover from '../../components/MenuPopover';
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const IMPORT_TYPES = [
  {
    label: 'In-progress student',
    icon: fileFill,
    id: 'inProgressStudent'
  },
  {
    label: 'Topic list',
    icon: fileFill,
    id: 'topicList'
  }
];

export default function ReadFilePopOver() {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
    console.log(type);
    e.preventDefault();
    // eslint-disable-next-line prefer-destructuring
    const files = e.target.files;
    if (!files) return;
    const f = files[0];
    const reader = new FileReader();
    // eslint-disable-next-line func-names
    reader.onload = function (e) {
      const data = reader.result;
      const readedData = XLSX.read(data, { type: 'binary' });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      // Convert array to json
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 2 });
      const inprogressStudentList = dataParse.map((student: any) => ({
        studentCode: student.RollNumber,
        email: student.Email,
        fullName: student.Name
      }));
      console.log(inprogressStudentList);
    };
    reader.readAsBinaryString(f);
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={() => setOpen(true)}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && { bgcolor: 'action.selected' })
        }}
      >
        <Icon icon={fileFill} width={20} height={20} />
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={() => setOpen(false)}
        anchorEl={anchorRef.current}
        sx={{ width: 240 }}
      >
        <Box sx={{ py: 1 }}>
          {IMPORT_TYPES.map((option, key) => (
            <label htmlFor={`upload${key}`} key={key}>
              <MenuItem sx={{ py: 1, px: 2.5 }}>
                <Box
                  component={Icon}
                  icon={option.icon}
                  sx={{
                    mr: 2,
                    width: 24,
                    height: 24
                  }}
                />
                {option.label}
                <input
                  type="file"
                  style={{ display: 'none' }}
                  accept=".xlsx,.xls"
                  id={`upload${key}`}
                  onChange={(e) => handleFileChange(e, option.id)}
                />
              </MenuItem>
            </label>
          ))}
        </Box>
      </MenuPopover>
    </>
  );
}
