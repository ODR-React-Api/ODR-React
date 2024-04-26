import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import SouthIcon from '@mui/icons-material/South';
import "../assets/style/main.scss"
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from "react-router-dom";
import { stateText } from "../../common/constants/constant"
import CircularProgress from '@mui/material/CircularProgress';
const lodash = require("lodash")

type propType = {
  stateNum: string
}

interface EventState {
  props: propType
}

// ステータスコンポーネント
class EventState extends React.Component {
  render() {
    return (
      <div className={"event-state state-number" + this.props.stateNum}>
        <span className="span-line-height-23">{stateText[this.props.stateNum === "99" ? 14 : (Number(this.props.stateNum) + 1)].text}</span>
      </div>
    )
  }
}

interface Data {
  cid: string;
  caseTitle: string;
  caseStatus: string;
  position: string;
  petitionDate: string;
  correspondingDate: string;
  messageFlag: string;
  Correspondence: string;
}

// 定义数据类型
type rowsType = {
  cid: string;
  caseTitle: string;
  caseStatus: string;
  position: string;
  petitionDate: string;
  correspondingDate: string;
  messageFlag: string;
  Correspondence: string;
}

type Order = 'asc' | 'desc';

// 数据排序依据，排序方式或排序列改变时触发
function stableSort(array: rowsType[], orderBy: string, order: Order, defaule: boolean) {
  // 判断升序还是降序
  if (order === 'asc') {
    // 99999999或00000000日期不参与排序，因此在升序时将值设为99999999使其位于最后
    array.forEach((item) => {
      item.petitionDate === "00000000" && (item.petitionDate = "99999999");
      item.correspondingDate === "00000000" && (item.correspondingDate = "99999999");
      item.messageFlag === "0" && (item.messageFlag = "max");
      item.Correspondence === "0" && (item.Correspondence = "99999999");
    })
  } else {
    // 降序排列时，将99999999更改为00000000，使其排在最后
    array.forEach((item) => {
      item.petitionDate === "99999999" && (item.petitionDate = "00000000");
      item.correspondingDate === "99999999" && (item.correspondingDate = "00000000");
      item.messageFlag === "max" && (item.messageFlag = "0");
      item.Correspondence === "99999999" && (item.Correspondence = "0");
    })
  }
  // orderBy方法需要用到的变量
  let keys: string[] = []
  let orders: Order[] = []
  // 判断是否为默认排序
  if (defaule) {
    keys = ["Correspondence", "correspondingDate"]; orders = ['desc', 'asc']
    array.forEach((item) => {
      item.correspondingDate === "00000000" && (item.correspondingDate = "99999999");
    })
  } else {
    // 若不是默认排序则匹配相应的排序规则
    switch (orderBy) {
      case "cid": keys = ["cid"]; orders = [order]; break;
      case "caseTitle": keys = ["caseTitle", "petitionDate"]; orders = [order, order]; break;
      case "caseStatus": keys = ["caseStatus", "correspondingDate"]; orders = [order, order]; break;
      case "position": keys = ["position", "correspondingDate"]; orders = [order, order]; break;
      case "petitionDate": keys = ["petitionDate", "cid"]; orders = [order, order]; break;
      case "correspondingDate": keys = ["correspondingDate", "petitionDate"]; orders = [order, order]; break;
      case "messageFlag": keys = ["messageFlag", "correspondingDate"]; orders = [order, order]; break;
      case "Correspondence": keys = ["Correspondence", "correspondingDate"]; orders = [order, order]; break;
    }
  }
  // 开始排序
  const stabilizedThis1 = lodash.orderBy(array, keys, orders)
  return stabilizedThis1;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: string;
  clazzName: string
}

// ヘッダー
const headCells: readonly HeadCell[] = [
  {
    id: 'cid',
    numeric: "center",
    disablePadding: true,
    label: '申立て番号',
    clazzName: 'width-11'
  },
  {
    id: 'caseTitle',
    numeric: "left",
    disablePadding: false,
    label: '件名',
    clazzName: 'width-30'
  },
  {
    id: 'caseStatus',
    numeric: "center",
    disablePadding: false,
    label: '状態',
    clazzName: 'width-10'
  },
  {
    id: 'position',
    numeric: "center",
    disablePadding: false,
    label: '立場',
    clazzName: 'width-8'
  },
  {
    id: 'petitionDate',
    numeric: "left",
    disablePadding: false,
    label: '登録日付',
    clazzName: 'width-10'
  },
  {
    id: 'correspondingDate',
    numeric: "left",
    disablePadding: false,
    label: '対応期日',
    clazzName: 'width-10'
  },
  {
    id: 'messageFlag',
    numeric: "center",
    disablePadding: false,
    label: 'メッセージ',
    clazzName: 'width-13'
  },
  {
    id: 'Correspondence',
    numeric: "center",
    disablePadding: false,
    label: '要対応',
    clazzName: 'width-8'
  },
];

// EnhancedTableHead的props的类型
interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
  setOrderDefault: (defaule: boolean) => void
}

// 表头
function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
      props.setOrderDefault(false)
      onRequestSort(event, property);
    };
  const [mouseEvent, setMouseEnter] = React.useState("-1")

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric === "center" ? "center" : "left"}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={headCell.clazzName}
          >
            <TableSortLabel
              active={orderBy === headCell.id || mouseEvent === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              hideSortIcon={true}
              IconComponent={SouthIcon}
              onMouseEnter={() => { setMouseEnter(headCell.id) }}
              onMouseLeave={() => { setMouseEnter("-1") }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// 定义EnhancedTable的props的类型
type enhancedTablePropsType = {
  rows: rowsType[],
  loading: boolean,
  setLoading:(loading:boolean) => void
}

export default function EnhancedTable(props: enhancedTablePropsType) {
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('Correspondence');
  const [page, setPage] = React.useState(0);
  const rowsPerPage = 10;
  const [rows, setRows] = React.useState<rowsType[]>(props.rows)
  const [defaule, setDefaule] = React.useState(true)
  const isInit = React.useRef(true)

  // 监听表格数组是否改变，改变时重置页数和排序方式
  React.useEffect(() => {
    setRows(props.rows)
    setPage(0)
    setOrder('desc')
    setOrderBy('Correspondence')
    setDefaule(true)
    if(isInit.current){
      isInit.current = false
    }else{
        props.setLoading(false)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.rows])

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof Data,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // 控制分页
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  // 数据缓存，当排序、分页、数据改变时重新触发
  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, orderBy, order, defaule).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rowsPerPage, rows],
  );

  // 时间数据格式化
  function formatDate(date: string) {
    const year = date.slice(0, 4);
    const month = date.slice(4, 6);
    const day = date.slice(6, 8);
    return year + "/" + month + "/" + day
  }
  // email组件
  const Email = (messageFlag: string) => {
    return (
      <div className="email-center-blue pointer">
        <EmailIcon fontSize="small" sx={{ color: "#00aaff" }} />
        <span>{messageFlag}</span>
      </div>
    )
  }

  const navigate = useNavigate();

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }} className='main-width'>
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={'small'}
            className='main'
          >
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              setOrderDefault={setDefaule}
            />
            {
              !props.loading && (
                rows.length !== 0 &&
                (<TableBody>
                  {visibleRows.map((row: rowsType, index: number) => {

                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        tabIndex={-1}
                        key={row.cid}
                      >
                        <TableCell
                          component="th"
                          id={labelId}
                          scope="row"
                          padding="none"
                          align="center"
                        >
                          <a onClick={() => navigate('/S04', { state: { caseId: row.cid, positionFlg: row.position } })} className='cid pointer'>{row.cid}</a>
                        </TableCell>
                        <TableCell align="left">{row.caseTitle}</TableCell>
                        <TableCell align="center"><EventState stateNum={row.caseStatus}></EventState></TableCell>
                        <TableCell align="center">{row.position === "1" ? "申立人"
                          : row.position === "2" ? "相手方" : "調停人"}</TableCell>
                        <TableCell align="left">{row.petitionDate === "99999999" || row.petitionDate === "00000000" ? "-" : formatDate(row.petitionDate)}</TableCell>
                        <TableCell align="left">{row.correspondingDate === "99999999" || row.correspondingDate === "00000000" ? "-" : formatDate(row.correspondingDate)}</TableCell>
                        <TableCell align="center"><a onClick={() => navigate('/S05', { state: { cid: row.cid } })}>{!(row.messageFlag === "0" || row.messageFlag === "max") && Email(row.messageFlag)}</a></TableCell>
                        <TableCell align="center"><span className="span-line-height-23 red-dot">{row.Correspondence === "1" && "●"}</span></TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>)
              )
            }
          </Table>
        </TableContainer>
        {(rows.length === 0 && (!props.loading)) && (<p>該当する申立てが見つかりませんでした。検索条件をご確認ください。</p>)}
        {props.loading && (
          <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '500px'}}>
            < CircularProgress/>
          </Box>
        )}
        <TablePagination
          rowsPerPageOptions={[]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          labelDisplayedRows={() => { return (<span>{rows.length + "件中" + (rows.length === 0 ? 0 : (page * 10 + 1)) + "-" + (rows.length > (page * 10 + 10) ? (page * 10 + 10) : rows.length) + "を表示"} </span>) }}
        />
      </Paper>
    </Box>
  );
}