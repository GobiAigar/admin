import { useEffect } from "react";
import { useFormik } from "formik";
import { Box, Button, InputLabel, TextField } from "@mui/material";
import { Backend_Endpoint } from "@/constants/constants";

const InputSection = ({ data, id }) => {
  useEffect(() => {}, [data]);
  const formik = useFormik({
    initialValues: {
      entitle: data?.entitle || "",
      mntitle: data?.mntitle || "",
      ensubtitle: data?.ensubtitle || "",
      mnsubtitle: data?.mnsubtitle || "",
      image_url1: data?.image_url1 || "",
      image_url2: data?.image_url2 || "",
      image_url3: data?.image_url3 || "",
      image_url4: data?.image_url4 || "",
    },
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        const response = fetch(`${Backend_Endpoint}/api/website/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(values),
        });
        if (await response) {
          alert("amjilttai soligloo");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      {data?.entitle && (
        <>
          <InputLabel htmlFor="entitle">Англи гарчиг</InputLabel>
          <TextField
            fullWidth
            id="entitle"
            name="entitle"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.entitle}
          />
        </>
      )}
      {data?.mntitle && (
        <div className="flex flex-col px-4">
          <InputLabel htmlFor="mntitle">Монгол гарчиг</InputLabel>
          <TextField
            fullWidth
            id="mntitle"
            name="mntitle"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.mntitle}
          />
        </div>
      )}
      {data?.ensubtitle && (
        <div className="flex flex-col px-4">
          <InputLabel htmlFor="ensubtitle">Англи дэд гарчиг</InputLabel>
          <TextField
            fullWidth
            id="ensubtitle"
            name="ensubtitle"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.ensubtitle}
          />
        </div>
      )}
      {data?.mnsubtitle && (
        <div className="flex flex-col px-4">
          <InputLabel htmlFor="mnsubtitle">Монгол дэд гарчиг</InputLabel>
          <TextField
            fullWidth
            id="mnsubtitle"
            name="mnsubtitle"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.mnsubtitle}
          />
        </div>
      )}
      {data?.image_url1 && (
        <div className="flex !flex-col px-4">
          <InputLabel htmlFor="image_url1">Зургийн хаяг</InputLabel>
          <TextField
            fullWidth
            id="image_url1"
            name="image_url1"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.image_url1}
          />
        </div>
      )}
      {data?.image_url2 && (
        <div className="flex flex-col px-4">
          <InputLabel htmlFor="image_url2">Зургийн хаяг 2</InputLabel>
          <TextField
            fullWidth
            id="image_url2"
            name="image_url2"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.image_url2}
          />
        </div>
      )}
      {data?.image_url3 && (
        <div className="flex flex-col px-4">
          <InputLabel htmlFor="image_url3">Зургийн хаяг 3</InputLabel>
          <TextField
            fullWidth
            id="image_url3"
            name="image_url3"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.image_url3}
          />
        </div>
      )}
      {data?.image_url4 && (
        <div className="flex flex-col px-4">
          <InputLabel htmlFor="image_url4">Зургийн хаяг 4</InputLabel>
          <TextField
            fullWidth
            id="image_url4"
            name="image_url4"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.image_url4}
          />
        </div>
      )}

      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" type="submit" fullWidth>
          Submit
        </Button>
      </Box>
    </form>
  );
};
export default InputSection;
