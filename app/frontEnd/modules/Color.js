/* eslint-disable class-methods-use-this */
class Color {
  get backgroundMain() {
    return 'rgb(250, 250, 250)';
  }

  get backgroundColorSideBar() {
    return 'rgb(240, 240, 240)';
  }
}

const color = new Color();
export default color;
