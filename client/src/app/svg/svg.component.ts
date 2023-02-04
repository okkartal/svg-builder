import { Component, OnInit } from '@angular/core';
import { Dimension } from '../models/dimension';
import { SvgService } from '../services/svg.service';

@Component({
  selector: 'app-svg',
  template: `<div id="base" (mouseup)="saveDimension()">
      <svg id="base-svg" width="100%" height="100%" preserveAspectRatio="none">
        <g>
          <rect x="0" y="0" width="100%" height="100%" />
        </g>
      </svg>
    </div>
    <div id="base-perimeter"></div> `,
  styles: [
    `
      #base {
        overflow: auto;
        margin: 0 auto;
        resize: both;
        height: fit-content;
        width: fit-content;
        position: relative;
      }

      #base-svg {
        display: block;
        float: left;
        background-color: purple;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        position: relative;
      }

      #rectangle {
        height: 100%;
        width: 100%;
        display: flex;
      }

      #base-perimeter {
        height: 100%;
        width: 100%;
        display: flex;
        text-align: center;
        justify-content: center;
      }
    `,
  ],
})
export class SvgComponent implements OnInit {
  constructor(private service: SvgService) {}

  ngOnInit(): void {
    this.getSize();
  }

  public dimension!: Dimension;

  getSize() {
    this.service.getDimension().subscribe((dimension: Dimension) => {
      this.dimension = dimension;
      this.setObjectDimension(this.dimension);
      this.getPerimeter(this.dimension);
    });
  }

  setObjectDimension(dimension: Dimension) {
    let obj = document.getElementById('base');
    obj?.setAttribute('style', `width:${dimension.width}px`);
    obj?.setAttribute('style', `height:${dimension.height}px`);
  }

  saveDimension(): void {
    let obj = document.getElementById('base');
    let currentDimension: Dimension = <Dimension>{};
    currentDimension.width = Number(obj?.style.width.replace('px', ''));
    currentDimension.height = Number(obj?.style.height.replace('px', ''));
    this.service.saveDimension(currentDimension).subscribe();
    this.getPerimeter(currentDimension);
  }

  getPerimeter(dimension: Dimension) {
    this.service.getPerimeter(dimension).subscribe((data: Number) => {
      let perimeterObj = document.getElementById('base-perimeter');
      if (perimeterObj) perimeterObj.innerHTML = `Current Perimeter: ${data}`;
    });
  }
}
