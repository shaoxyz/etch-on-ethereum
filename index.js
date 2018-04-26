const Web3 = require('web3')

// let web3;

// init when window load or refresh or metamask is changed
window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)
  if(typeof web3 != 'undefined'){
    console.log("Using web3 detected from external source like Metamask")
    window.web3 = new Web3(web3.currentProvider)
    web3.version.getNetwork((error, result) => {
      switch (result) {
        case "1":
          // console.log('This is mainnet')
          document.getElementById("net").innerHTML="Main Network"
          window.network=''
          break
        case "3":
          // console.log('This is the ropsten test network.')
          document.getElementById("net").innerHTML="Ropsten Test Network"
          window.network='ropsten.'
          break
        case "4":
          // console.log('This is the Rinkeby test network.')
          document.getElementById("net").innerHTML="Rinkeby Test Network"
          window.network='rinkeby.'
          break
        case "42":
          // console.log('This is the Kovan test network.')
          document.getElementById("net").innerHTML="Kovan Test Network"
          window.network='kovan.'
          break
        default:
          // console.log('This is an unknown network.')
          document.getElementById("net").innerHTML="Unknown Network"
      }
    })
  } else {
      document.getElementById("net").innerHTML="...未找到MetaMask，请 安装/激活 MetaMask插件"
  }
})

$(function () {

  $('form').on('submit',function(e) {
    e.preventDefault();
    var str = $('#inputData').val();
    // console.log(str);
    let data = web3.toHex(str)
    // console.log(data)
    // here to call MetaMask
    web3.eth.sendTransaction({
      to: web3.eth.accounts[0],
      from: web3.eth.accounts[0],
      // value: 0x00,
      gas:100000,
      gasPrice:10000000000,
      data: data
      }, function (err, transactionHash) {
        if (err) {
          // alert('Oh no!: ' + err.message)
          let alertMsg = '<div class="alert alert-warning alert-dismissible fade show" role="alert" width="60%">'
            + '<strong>哎哟!出错了! 如果字数很多的话，尝试在支付时提高gasLimit.</strong> '
            + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
          document.getElementById('alert-broad').innerHTML=alertMsg

          // document.getElementById('alert-broad').innerHTML =
        } else {
          let ethersan = 'https://'+window.network+'etherscan.io/tx/'+transactionHash
          let alertMsg = '<div class="alert alert-success alert-dismissible fade show" role="alert" width="60%">'
            + '<strong>发送成功!</strong> 这段文字将永远记录在以太坊区块链上</br>'
            + '记录哈希值为：'+'<span>'+transactionHash+'</span></br>'
            + '点击<a target="_blank" href="'
            + ethersan
            + '">这里</a>在区块链浏览器上查看'
            + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
          document.getElementById('alert-broad').innerHTML=alertMsg
        }
      })
  })
});
