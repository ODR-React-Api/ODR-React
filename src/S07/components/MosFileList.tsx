import React, { useEffect, useState } from 'react';
import '../assets/styles/S07.css'
import { Box, Button, Checkbox, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import axios from 'axios';
import '../mocks/mock.js';
import { visuallyHidden } from '@mui/utils';
import PropTypes from 'prop-types'
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import ImageIcon from '@mui/icons-material/Image';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import {useLocation} from 'react-router-dom';
import { CircularProgress } from '@mui/material';
var lodash = require('lodash');

  
type Order = 'asc' | 'desc';

  function stableSort(array: any[], order:Order,orderBy:string) {
    
    return lodash.orderBy(array,orderBy,order);
  }
  
  // 标题设定
  const headCells = [
    {
      id: 'FileName',
      numeric: false,
      disablePadding: true,
      label: 'ファイル名称',
    },
    {
      id: 'RegisterUserId',
      numeric: false,
      disablePadding: false,
      label: '登録者',
    },
    {
      id: 'RegisterDate',
      numeric: false,
      disablePadding: false,
      label: '登録日時',
    },
  ];

  // 全选，sort顺设定
  function EnhancedTableHead(props:any) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
      
    const createSortHandler = (property: string) => (event: any) => {
      onRequestSort(event, property);
    };
  
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={true}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
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

  // propTypes校验
  EnhancedTableHead.propTypes = {
      numSelected: PropTypes.number.isRequired,
      onRequestSort: PropTypes.func.isRequired,
      onSelectAllClick: PropTypes.func.isRequired,
      order: PropTypes.oneOf(['asc', 'desc']).isRequired,
      orderBy: PropTypes.string.isRequired,
      rowCount: PropTypes.number.isRequired,
    };


function MosFileList() {

  const {state} = useLocation();

    // 初期化
    const [res, setRes] = useState(
        {fileInfo:[{
            id:0,
            FileName:'',
            FileUrl:'',
            RegisterUserId: '',
            RegisterDate: '',
            CaseStage: 0
        }]}
    )

    const [loading,setLoading] = useState(true)


    const [loginUser, setLoginUser] = useState({UserId:0,MediatorUserFlag:0}) 
    // 取得fileInfo
    useEffect(() =>{
        axios.get('/GetFileInfo')
        .then((response) =>{
            setRes(response.data.data)
            setLoading(false)
        })
    },[])

    useEffect(() => {
        // 取得LoginUser
        axios.get('/GetLoginUser')
        .then((response) =>{
          setLoginUser(response.data.data)
        });
    },[])

    
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState('FileName');
  const [selected, setSelected] = React.useState<number[]>([]);


  const handleRequestSort = (event: any,property: React.SetStateAction<string>) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  
  const visibleRows = React.useMemo(
    () =>stableSort(res.fileInfo,order,orderBy),
    [order, orderBy,res.fileInfo],
  );

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelected = res.fileInfo.map((n) => n.id);
      
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleSelectClick = (event:any, id:number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: any[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  // 点击 一括ダウンロード 按钮，获取文件名
  function downlLoadClick() {
    
    // 遍历循环选中的文件
    visibleRows.forEach((row:any) => {
      const isItemSelected = isSelected(row.id);
      if (isItemSelected) {
            console.log(row.FileName)   
      }
    })
  }

    return (
        <div className="div">
            <div className="div1">
                <span className="title">添付ファイル一覧</span>
                {/* 一括ダウンロード */}
                <Button
                    component="label"
                    variant="outlined"
                    style={{borderColor:'grey',backgroundColor:'white',color:'grey',float:'right',marginRight:30,marginTop:22}}
                    startIcon={<CloudDownloadIcon/>}
                    disabled = {selected.length === 0 ? true :false}
                    onClick={downlLoadClick}
                  >一括ダウンロード
                  </Button>
            </div>
            {/* 未取到mock中数据时，显示loading */}
            {loading === true ? 
              <Box sx={{ display: 'flex',alignItems: 'center',justifyContent: 'center',minHeight: '270px'}}>
                < CircularProgress/>
              </Box>:
            <div className="div2">
                <Box sx={{ width: '100%' }}>
                    <TableContainer>
                        <Table
                        sx={{ minWidth: 700 }}
                        aria-labelledby="tableTitle"
                        >
                        {/* 标题 */}
                        <EnhancedTableHead
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            onSelectAllClick={handleSelectAllClick}
                            onRequestSort={handleRequestSort}
                            rowCount={res.fileInfo.length}
                        />
                        {/* 文件 */}
                        <TableBody>
                            {visibleRows.map((row:any, index:number) => {
                            const isItemSelected = isSelected(row.id);
                            
                            const labelId = `enhanced-table-checkbox-${index}`;
                            return (
                              (state.positionFlg === "1" || state.positionFlg === "2" || (state.positionFlg === "3" && (loginUser.MediatorUserFlag === 0 || 2) && row.CaseStage === 3)) &&
                                <TableRow
                                hover
                                role="checkbox"
                                aria-checked={isItemSelected}
                                tabIndex={-1}
                                key={row.id}
                                selected={isItemSelected}
                                sx={{ cursor: 'pointer' }}
                                >
                                {/* 复选框 */}
                                <TableCell padding="checkbox" onClick={(event) => handleSelectClick(event, row.id)} >
                                    <Checkbox
                                    color="primary"
                                    checked={isItemSelected}
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                    />
                                </TableCell>
                                {/* 文件名 */}
                                <TableCell
                                    component="th"
                                    id={labelId}
                                    scope="row"
                                    padding="none"
                                >
                                    {row.FileName.match('png') && <ImageIcon />}
                                    {row.FileName.match('pdf') && <PictureAsPdfIcon style={{color:'red'}} />}
                                    {row.FileName.match('xls') && <InsertDriveFileIcon />}
                                    <Link href={row.FileUrl} download ={row.FileName}>{row.FileName}</Link>
                                </TableCell>
                                {/* 登录者 */}
                                <TableCell align="left">{row.RegisterUserId}</TableCell>
                                {/* 登录日时 */}
                                <TableCell align="left">{row.RegisterDate}</TableCell>
                                </TableRow>
                            );
                            })}
                        </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </div>
          }
        </div>
    )

}

export default MosFileList
