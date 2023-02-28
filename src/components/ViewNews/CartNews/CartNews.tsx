import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';

import { News, removeNews } from 'redux/news/newsSlice';
import { useAppDispatch } from 'hooks';

interface IProps {
  article: News;
}
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CartNews({ article }: IProps) {
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useAppDispatch();
  // * возвращает удобночитаемый вид даты
  const getClearDatePublish = (date: string) => date.replace(/[a-zA-Z]/g, ' ');
  // * разворачивает спойлер с детальной информацией
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  // * удаление статьи
  const onDeleteNews = (title: string) => {
    dispatch(removeNews(title));
  };

  return (
    <Card sx={{ maxWidth: '100%' }}>
      <CardHeader
        action={
          <IconButton aria-label="delete" onClick={() => onDeleteNews(article.title)}>
            <DeleteIcon />
          </IconButton>
        }
        title={article.title}
        subheader={getClearDatePublish(article.publishedAt)}
      />
      <CardMedia
        component="img"
        height="194"
        sx={{
          maxHeight: '360px',
          maxWidth: '640px',
        }}
        image={article?.urlToImage ? article.urlToImage : 'http://placeimg.com/640/360/any'}
        alt="News"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {article.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore expand={expanded} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{article.content}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
