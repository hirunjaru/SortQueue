
export class Checkout {
  private carts: number[][];

  constructor() {
    this.carts = [];
    // Init 5 counter
    for (let i = 0; i < 5; i++) {
      this.carts[i] = [];
      this.carts[i][0] = 0;
    }
  }

  // get all cart
  getQueue(): number[][] {
    // console.log(this.carts)
    return this.carts;
    
  }

  // update cart
  updateItem(row: number, col: number, value: number): void {
    // Ensure row exists before updating
    if (!this.carts[row]) {
      this.carts[row] = [];
    }
    this.carts[row][col] = value;
    // console.log(this.carts[row][col])
  }

  checkItem(row: number, col: number): boolean{
    return this.carts[row][col] === 0
  }

  deleteItem(row: number){
    for(let i = 0; i < this.carts[row].length; i++){
      if(this.carts[row][i+1]){
        this.carts[row][i] = this.carts[row][i+1]
      }else{
        this.carts[row][i] = 0
      }
      
    }
  }

  decreaseCart(): void{
    for(let row = 0; row < this.carts.length; row++){
      if(this.carts[row][0] !== 0){
        this.carts[row][0] = this.carts[row][0] - 1
      }else{
        console.log('in delete')
        this.deleteItem(row)
      }
      
    }
  }

  // Method to add a new row
  addRow(): void {
    this.carts.push([]);
  }
}
