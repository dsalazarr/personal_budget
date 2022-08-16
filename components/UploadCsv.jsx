import { Button } from "@mui/material";

export default function UploadCsv({ onSubmit }) {

    return (
      <Button
        variant="contained"
        component="label"
      >
        Upload File
        <input
          type="file"
          hidden
          onInput={(event) => {
            onSubmit(event)
            event.target.value = ''
          }}
        />
      </Button>
    )
  }
  