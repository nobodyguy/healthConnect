import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardContent from "@mui/material/CardContent";
import Carousel from "react-material-ui-carousel";

const Elibrary = () => {
    const items = [
      {
        name: "Jak připravit imunitu na podzim?",
        description: "",
        img: "",
      },
      {
        name: "Nová brožura k dispozici",
        description:
          "Přečtěte si jak očkování proti pneumokokovým onemocněním pomáhá chránit vaše dítě.",
        img: "https://www.babyonline.cz/Image/ockovani/ebook-ockovani-2021/brozura-ockovani-page-011.jpg",
      }
    ];
    return (
      <CardContent>
        {" "}
        <Carousel duration={1000}>
          {items.map((item) => (
            <Box
              sx={{
                padding: { xs: "0 0 3rem 0", sm: "0 0 3rem 0", md: "0 4rem" },
              }}
            >
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <div>
                <img src={item.img} />
              </div>
  
              <Button variant="outlined">Zobrazit</Button>
            </Box>
          ))}
        </Carousel>
      </CardContent>
    );
  };

  export default Elibrary;