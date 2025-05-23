import { Card, CardMedia, Typography, useTheme } from "@mui/material";

function HomeHero({ data }) {
  const theme = useTheme();

  return (
    <>
      <Typography gutterBottom variant="h2">
        {data?.entitle}
      </Typography>
      <Typography variant="subtitle2">{data?.ensubtitle}</Typography>
      <Typography gutterBottom variant="h2">
        {data?.mntitle}
      </Typography>
      <Typography variant="subtitle2">{data?.mnsubtitle}</Typography>

      <div className="grid grid-cols-2">
        {data?.image_url1 &&
          (data.entitle === "statistic" ? (
            <Card sx={{ maxWidth: 200 }}>
              <iframe
                width="100%"
                height="315"
                src={data?.image_url1}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Card>
          ) : (
            <CardMedia
              sx={{ height: 200 }}
              image={data.image_url1}
              title={data?.entitle || ""}
            />
          ))}

        {data?.image_url2 && (
          <CardMedia
            sx={{ height: 200 }}
            image={data.image_url2}
            title={data?.entitle || ""}
          />
        )}
        {data?.image_url3 && (
          <CardMedia
            sx={{ height: 200 }}
            image={data.image_url3}
            title={data?.entitle || ""}
          />
        )}
        {data?.image_url4 && (
          <CardMedia
            sx={{ height: 200 }}
            image={data.image_url4}
            title={data?.entitle || ""}
          />
        )}
      </div>
    </>
  );
}

export default HomeHero;
