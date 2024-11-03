import { FC, useRef, useEffect, useState, useCallback } from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  List,
  Button,
  IconButton,
  Divider
} from "@mui/material"
import {
  Image as ImageIcon,
  Download as DownloadIcon,
  Delete as DeleteIcon,
  ImageSearch as ShowIcon,
  Upload as UploadIcon
} from '@mui/icons-material';
import { useGetList } from 'react-admin';
import SimpleDialogDemo from './ModalDialog';


const FileList: FC<{ requestId?: string }> = ({ requestId }) => {
  const { data: files = [] } = useGetList("files", { filter: { request_id: parseInt(requestId || "0") } })
  const [small, setSmall] = useState<boolean>(false)
  const containerRef = useRef(null)
  
  useEffect(() => {
    if (containerRef.current) {
      const width = (containerRef.current as HTMLElement).getBoundingClientRect().width
      setSmall(width <= 650)
    }
  }, [containerRef])

  const[url, setUrl] = useState<string | undefined>(undefined)
  const handleClose = useCallback(() => setUrl(undefined), [])

  return (
    <>
      <List ref={containerRef} sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {files?.map(f => 
          <>
            <ListItem key={`${f.filename}_row`}>
              <ListItemAvatar key={`${f.filename}_avatar_box`}>
                <Avatar key={`${f.filename}_avatar`}>
                  <ImageIcon key={`${f.filename}_img`} />
                </Avatar>
              </ListItemAvatar>
              <ListItemText key={`${f.filename}_label`} primary={f.filename} secondary={f.created} />
              {small ? 
                <>
                  <IconButton
                    key={`${f.filename}_show`}
                    color='primary'
                    onClick={() => setUrl(f.url)}
                  >
                    <ShowIcon />
                  </IconButton>
                  <IconButton
                    key={`${f.filename}_download`}
                    color='primary'
                  >
                    <DownloadIcon />
                  </IconButton>
                  <IconButton
                    key={`${f.filename}_delete`}
                    color='primary'
                  >
                    <DeleteIcon />
                  </IconButton>
                </> :
                <>
                  <Button
                    variant="contained"
                    startIcon={<ShowIcon />}
                    sx={{mr: 1 }}
                    key={`${f.filename}_show`}
                    onClick={() => setUrl(f.url)}
                  >
                    Show
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DownloadIcon />}
                    sx={{mr: 1 }}
                    key={`${f.filename}_download`}
                  >
                    Download
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    key={`${f.filename}_delete`}
                  >
                    Delete
                  </Button>
                </>
              }
            </ListItem>
            <Divider />
          </>
        )}
        <ListItem sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button
            variant="contained"
            startIcon={<UploadIcon />}
          >
            Upload files
          </Button>
        </ListItem>
      </List>
      {url ? <SimpleDialogDemo url={url} handleClose={handleClose} /> : null}
    </>
  );
}

export { FileList }